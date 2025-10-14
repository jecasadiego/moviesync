import axios, { AxiosInstance } from "axios";
import crypto from "node:crypto";
import type {
  BackblazeNativeConfig,
  UploadInput,
  UploadResult,
  DeleteResult,
  RenameInput,
  RenameResult,
  SignedDownloadInput,
} from "@api/backblaze/domain/backblaze.entity";
import type { Readable } from "node:stream";


export type StreamResult = {
  status: number;
  headers: Record<string, string>;
  stream: Readable;
};

/**
 * Servicio API nativa de Backblaze B2 (b2_*).
 * Flujo clave:
 *  - b2_authorize_account (una vez, cachea token/apiUrl/downloadUrl)
 *  - b2_get_upload_url (por bucket) -> uploadUrl + uploadToken
 *  - POST b2_upload_file (headers + body binario)
 *  - b2_list_file_names / b2_list_file_versions para hallar fileId por key
 *  - b2_delete_file_version, b2_copy_file, b2_get_download_authorization
 */
export class BackblazeNativeService {
  private readonly cfg: BackblazeNativeConfig;
  private authToken: string | null = null;
  private apiUrl: string | null = null;
  private downloadUrl: string | null = null;
  private readonly http: AxiosInstance;

  // cache efímero de uploadUrl/token (expira al usarse mucho)
  private uploadUrl: string | null = null;
  private uploadToken: string | null = null;

  constructor(cfg: BackblazeNativeConfig) {
    this.cfg = cfg;
    this.http = axios.create({ timeout: 60_000 });
  }


  // ---------- Auth base ----------

  private async authorizeAccount(): Promise<void> {
    if (this.authToken && this.apiUrl && this.downloadUrl) return;
    const auth = Buffer.from(`${this.cfg.keyId}:${this.cfg.applicationKey}`).toString("base64");
    const { data } = await this.http.get("https://api.backblazeb2.com/b2api/v2/b2_authorize_account", {
      headers: { Authorization: `Basic ${auth}` },
    });

    if (!data.authorizationToken) throw new Error("No se pudo obtener token de autorización");

    this.authToken = data.authorizationToken;
    this.apiUrl = data.apiUrl;               // ej: https://apiNNN.backblazeb2.com
    this.downloadUrl = data.downloadUrl;     // ej: https://fNNN.backblazeb2.com
    this.cfg.apiUrl = this.apiUrl || "";
    this.cfg.downloadUrl = this.downloadUrl || "";
  }

  // ---------- Upload helpers ----------

  private async getUploadUrl(): Promise<void> {
    await this.authorizeAccount();
    if (this.uploadUrl && this.uploadToken) return;
    console.log("apiUrl", this.apiUrl);

    const { data } = await this.http.post(
      `${this.apiUrl}/b2api/v2/b2_get_upload_url`,
      { bucketId: this.cfg.bucketId },
      { headers: { Authorization: this.authToken! } }
    );

    this.uploadUrl = data.uploadUrl;               // URL única para subir
    this.uploadToken = data.authorizationToken;    // token específico de upload
  }

  private percentEncode(str: string) {
    // B2 exige UTF-8 percent-encoded para X-Bz-File-Name
    return encodeURIComponent(str).replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
  }

  private sha1Hex(buf: Buffer) {
    return crypto.createHash("sha1").update(buf).digest("hex");
  }

  // ---------- Operaciones públicas ----------

  /**
   * Sube un archivo (buffer) con b2_upload_file.
   * Para tamaños > 100MB conviene 'large files' (b2_start_large_file + parts); aquí no hace falta.
   */
  async uploadBuffer(buffer: Buffer, input: UploadInput): Promise<UploadResult> {
    await this.getUploadUrl();
    const fileName = this.percentEncode(input.key);
    const sha1 = this.sha1Hex(buffer);
    const contentType = input.contentType ?? "b2/x-auto";

    const headers: Record<string, string> = {
      Authorization: this.uploadToken!,
      "X-Bz-File-Name": fileName,
      "Content-Type": contentType,
      "Content-Length": String(buffer.byteLength),
      "X-Bz-Content-Sha1": sha1,
    };

    if (input.lastModifiedMillis) {
      headers["X-Bz-Info-src_last_modified_millis"] = String(input.lastModifiedMillis);
    }

    const { data } = await this.http.post(this.uploadUrl!, buffer, { headers });
    return {
      fileId: data.fileId,
      key: data.fileName,
      contentLength: data.contentLength,
      contentSha1: data.contentSha1,
    };
  }

  /**
   * Elimina por 'key' (nombre lógico). Hace lookup del fileId y llama b2_delete_file_version.
   * Nota: B2 guarda versiones; borramos la versión actual (última encontrada).
   */
  async deleteByName(key: string): Promise<DeleteResult> {
    await this.authorizeAccount();

    const { fileId } = await this.getFileIdByNameOrThrow(key);

    const { data } = await this.http.post(
      `${this.apiUrl}/b2api/v2/b2_delete_file_version`,
      { fileId, fileName: key },
      { headers: { Authorization: this.authToken! } }
    );

    return { fileId: data.fileId, key: data.fileName };
  }

  /**
   * "Renombrar": copia a nueva key y borra la original.
   * - Si overwrite=false y existe destino, lanza error.
   */
  async renameObject(input: RenameInput): Promise<RenameResult> {
    await this.authorizeAccount();

    // (1) origen
    const { fileId: fromId } = await this.getFileIdByNameOrThrow(input.fromKey);

    // (2) si no overwite, verificar destino
    if (!input.overwrite) {
      const exists = await this.existsByName(input.toKey);
      if (exists) throw new Error(`Destino ya existe: ${input.toKey}`);
    }

    // (3) copiar al nuevo nombre
    const { data: copy } = await this.http.post(
      `${this.apiUrl}/b2api/v2/b2_copy_file`,
      {
        sourceFileId: fromId,
        fileName: input.toKey,             // nuevo nombre lógico
        destinationBucketId: this.cfg.bucketId,
        // optional: metadataDirective, contentType, etc.
      },
      { headers: { Authorization: this.authToken! } }
    );

    // (4) borrar versión original
    await this.http.post(
      `${this.apiUrl}/b2api/v2/b2_delete_file_version`,
      { fileId: fromId, fileName: input.fromKey },
      { headers: { Authorization: this.authToken! } }
    );

    return {
      from: { fileId: fromId, key: input.fromKey },
      to: { fileId: copy.fileId, key: copy.fileName },
    };
  }

  /**
   * URL de descarga firmada (para bucket privado) usando b2_get_download_authorization.
   * Devuelve una URL lista para usar en <audio> (con query token).
   */
  async getSignedDownloadUrl({ key, expiresSeconds = 3600 }: SignedDownloadInput): Promise<string> {
    await this.authorizeAccount();

    const { data } = await this.http.post(
      `${this.apiUrl}/b2api/v2/b2_get_download_authorization`,
      {
        bucketId: this.cfg.bucketId,
        fileNamePrefix: key, // exact match si usas la key completa
        validDurationInSeconds: expiresSeconds,
        // optional: b2ContentDisposition, etc.
      },
      { headers: { Authorization: this.authToken! } }
    );

    // URL by name + token
    const base = `${this.downloadUrl}/file/${this.cfg.bucketName}/${encodeURI(key)}`;
    const url = `${base}?Authorization=${encodeURIComponent(data.authorizationToken)}`;
    return url;
  }

  // ---------- Utilidades ----------

  async existsByName(key: string): Promise<boolean> {
    await this.authorizeAccount();

    const { data } = await this.http.post(
      `${this.apiUrl}/b2api/v2/b2_list_file_names`,
      {
        bucketId: this.cfg.bucketId,
        startFileName: key,
        maxFileCount: 1,
        prefix: key,
      },
      { headers: { Authorization: this.authToken! } }
    );

    return Array.isArray(data.files) && data.files[0]?.fileName === key;
  }

  private async getFileIdByNameOrThrow(key: string): Promise<{ fileId: string }> {
    const { data } = await this.http.post(
      `${this.apiUrl}/b2api/v2/b2_list_file_versions`,
      {
        bucketId: this.cfg.bucketId,
        startFileName: key,
        maxFileCount: 1,
        prefix: key,
      },
      { headers: { Authorization: this.authToken! } }
    );

    const file = data.files?.find((f: any) => f.fileName === key && !f.action?.includes("hide"));
    if (!file) throw new Error(`No se encontró fileId para key: ${key}`);
    return { fileId: file.fileId };
  }

  private buildFileUrl(key: string): string {
    return `${this.downloadUrl}/file/${this.cfg.bucketName}/${encodeURI(key)}`;
  }

  async getDownloadTokenForPrefix(prefix: string, expiresSeconds = 60): Promise<string> {
    await this.authorizeAccount();
    const { data } = await this.http.post(
      `${this.apiUrl}/b2api/v2/b2_get_download_authorization`,
      { bucketId: this.cfg.bucketId, fileNamePrefix: prefix, validDurationInSeconds: expiresSeconds },
      { headers: { Authorization: this.authToken! } }
    );
    return data.authorizationToken as string;
  }

  /**
   * Devuelve stream + headers + status desde B2 (con soporte Range).
   * NO toca Express.
   */
  async getStreamObjectWithRange(
    key: string,
    rangeHeader?: string,
    opts?: { token?: string }
  ): Promise<StreamResult> {
    await this.authorizeAccount();
    const url = this.buildFileUrl(key);

    const headers: Record<string, string> = {};
    if (opts?.token) headers["Authorization"] = opts.token;
    if (rangeHeader) headers["Range"] = rangeHeader;

    const upstream = await this.http.get(url, {
      headers,
      responseType: "stream",
      // Permitimos 200 (sin Range) y 206 (con Range)
      validateStatus: s => s === 200 || s === 206,
    });

    // Normaliza headers a string plano
    const flatHeaders: Record<string, string> = {};
    Object.entries(upstream.headers).forEach(([k, v]) => {
      flatHeaders[k.toLowerCase()] = Array.isArray(v) ? v.join(", ") : String(v);
    });

    return {
      status: upstream.status,
      headers: flatHeaders,
      stream: upstream.data,
    };
  }
}
