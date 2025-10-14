import { Request, Response } from "express";
import { BackblazeUseCase } from "@api/backblaze/application/backblaze.usecase";
import type { BackblazeNativeConfig } from "@api/backblaze/domain/backblaze.entity";
import { getIdUserLogged } from "@app/utils/validations";


export class BackblazeController {
    constructor(private readonly uc: BackblazeUseCase) { }

    static fromEnv(): BackblazeController {
        const cfg: BackblazeNativeConfig = {
            keyId: process.env.B2_KEY_ID!,
            applicationKey: process.env.B2_APP_KEY!,
            bucketId: process.env.B2_BUCKET_ID!,
            bucketName: process.env.B2_BUCKET!,
        };
        return new BackblazeController(new BackblazeUseCase(cfg));
    }

    // POST /media/upload?key=...  (multipart: field "file")
    upload = async (req: Request, res: Response) => {
        try {
            const file = (req as any).file as Express.Multer.File | undefined;
            const key = String(req.query.key || "");
            if (!file) return res.status(400).json({ ok: false, message: "file requerido" });
            if (!key) return res.status(400).json({ ok: false, message: "key requerido" });

            const out = await this.uc.uploadBuffer(file.buffer, {
                key,
                contentType: file.mimetype,
                lastModifiedMillis: Date.now(),
            });

            return res.status(201).json({ ok: true, data: out });
        } catch (e: any) {
            return res.status(500).json({ ok: false, message: e.message });
        }
    };

    // DELETE /media?key=...
    remove = async (req: Request, res: Response) => {
        try {
            const key = String(req.query.key || "");
            if (!key) return res.status(400).json({ ok: false, message: "key requerido" });
            const out = await this.uc.deleteByName(key);
            return res.status(200).json({ ok: true, data: out });
        } catch (e: any) {
            return res.status(500).json({ ok: false, message: e.message });
        }
    };

    // POST /media/rename { fromKey, toKey, overwrite? }
    rename = async (req: Request, res: Response) => {
        try {
            const { fromKey, toKey, overwrite } = req.body ?? {};
            if (!fromKey || !toKey) {
                return res.status(400).json({ ok: false, message: "fromKey y toKey requeridos" });
            }
            const out = await this.uc.renameObject({ fromKey, toKey, overwrite });
            return res.status(200).json({ ok: true, data: out });
        } catch (e: any) {
            return res.status(500).json({ ok: false, message: e.message });
        }
    };

    // GET /media/signed-url?key=...&expires=3600
    signedUrl = async (req: Request, res: Response) => {
        try {
            const key = String(req.query.key || "");
            const expiresSeconds = req.query.expires ? Number(req.query.expires) : 3600;
            if (!key) return res.status(400).json({ ok: false, message: "key requerido" });
            const url = await this.uc.signedDownloadUrl({ key, expiresSeconds });
            return res.status(200).json({ ok: true, data: { url, expiresSeconds } });
        } catch (e: any) {
            return res.status(500).json({ ok: false, message: e.message });
        }
    };

    //GET /media/stream/progressive?key=<archivo.m4a|mp4> ===

    public progressive = async (req: Request, res: Response): Promise<void> => {
        try {
            const idUserLogged = getIdUserLogged(req.headers.authorization);
            console.log("UserId:", idUserLogged);
            const key = typeof req.query.key === "string" ? req.query.key : "";
            if (!key) {
                res.status(400).json({ ok: false, message: "key requerido" });
                return;
            }

            const range = typeof req.headers.range === "string" ? req.headers.range : undefined;

            const { status, headers, stream } = await this.uc.streamProgressive(key, range);

            // Propaga headers útiles (sanitize)
            const allow = new Set(["content-type", "content-length", "content-range", "etag", "last-modified"]);
            for (const [k, v] of Object.entries(headers)) {
                if (allow.has(k)) res.setHeader(k, v);
            }

            // Siempre anuncia soporte de rangos al cliente
            res.setHeader("Accept-Ranges", "bytes");
            const userId = idUserLogged;
            res.setHeader("ETag", `"${key}-${userId}"`);

            // Política de caché (ajústala a tu caso)
            if (!res.getHeader("Cache-Control")) {
                res.setHeader("Cache-Control", "private, max-age=60, must-revalidate");
            }

            res.status(status);

            // Manejo de abort del cliente (evita fugas de recursos)
            const onAborted = () => {
                try { stream.destroy(); } catch { }
            };
            req.on("aborted", onAborted);
            res.on("close", onAborted);

            // Pipe del stream al response
            stream.pipe(res);
        } catch (e: any) {
            if (!res.headersSent) {
                res.status(500).json({ ok: false, message: e.message });
            }
        }
    };
}
