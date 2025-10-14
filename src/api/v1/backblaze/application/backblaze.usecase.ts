import type {
    BackblazeNativeConfig,
    UploadInput,
    UploadResult,
    DeleteResult,
    RenameInput,
    RenameResult,
    SignedDownloadInput,
} from "@api/backblaze/domain/backblaze.entity";
import { BackblazeNativeService } from "@api/backblaze/infrastructure/services/backblaze.services";
import type { StreamResult } from "@api/backblaze/infrastructure/services/backblaze.services";

export class BackblazeUseCase {
    private readonly svc: BackblazeNativeService;

    constructor(cfg: BackblazeNativeConfig) {
        this.svc = new BackblazeNativeService(cfg);
    }

    async uploadBuffer(buffer: Buffer, input: UploadInput): Promise<UploadResult> {
        this.ensureKey(input.key);
        return this.svc.uploadBuffer(buffer, input);
    }

    async deleteByName(key: string): Promise<DeleteResult> {
        this.ensureKey(key);
        return this.svc.deleteByName(key);
    }

    async renameObject(input: RenameInput): Promise<RenameResult> {
        this.ensureKey(input.fromKey); this.ensureKey(input.toKey);
        return this.svc.renameObject(input);
    }

    async signedDownloadUrl(input: SignedDownloadInput): Promise<string> {
        this.ensureKey(input.key);
        return this.svc.getSignedDownloadUrl(input);
    }

    private ensureKey(key: string) {
        if (!key || key.startsWith("/") || key.includes("..")) {
            throw new Error("Key inválida.");
        }
    }

    public async streamProgressive(key: string, range?: string): Promise<StreamResult> {
        this.ensureKey(key);
        const prefix = key.slice(0, key.lastIndexOf("/") + 1);
        const token = await this.svc.getDownloadTokenForPrefix(prefix, 60); // token corto, renovable por request
        return this.svc.getStreamObjectWithRange(key, range, { token });
    }
}
