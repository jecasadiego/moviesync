export interface BackblazeNativeConfig {
  keyId: string;            // B2_KEY_ID
  applicationKey: string;   // B2_APP_KEY
  bucketId: string;         // B2_BUCKET_ID (ojo: ID, no nombre)
  bucketName: string;       // B2_BUCKET (nombre)
  downloadUrl?: string;     // lo completa authorizeAccount
  apiUrl?: string;          // lo completa authorizeAccount
}

export interface UploadInput {
  key: string;               // ej: movies/his-girl-friday/audio/es.mp3
  contentType?: string;      // ej: audio/mpeg
  lastModifiedMillis?: number; // x-bz-info-src_last_modified_millis
}

export interface RenameInput {
  fromKey: string;
  toKey: string;
  overwrite?: boolean;
}

export interface SignedDownloadInput {
  key: string;
  expiresSeconds?: number; // default 3600
}

export interface UploadResult {
  fileId: string;
  key: string;
  contentLength: number;
  contentSha1: string;
}

export interface DeleteResult {
  fileId: string;
  key: string;
}

export interface RenameResult {
  from: { fileId: string; key: string };
  to:   { fileId: string; key: string };
}
