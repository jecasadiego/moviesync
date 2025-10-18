// src/providers/backblaze.ts
import { BackblazeUseCase } from "@api/backblaze/application/backblaze.usecase";
import type { BackblazeNativeConfig } from "@api/backblaze/domain/backblaze.entity";

let singleton: BackblazeUseCase | null = null;

export function getBackblaze(): BackblazeUseCase {
  if (singleton) return singleton;

  const cfg: BackblazeNativeConfig = {
    keyId: process.env.B2_KEY_ID!,
    applicationKey: process.env.B2_APP_KEY!,
    bucketId: process.env.B2_BUCKET_ID!,
    bucketName: process.env.B2_BUCKET!,
  };

  singleton = new BackblazeUseCase(cfg);
  return singleton;
}
