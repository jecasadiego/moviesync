import { Router } from "express";
import multer from "multer";
import { BackblazeController } from "../controller/backblaze.controller";
import { validateAdminMiddleware } from "@app/utils/middlewares";

const upload = multer({ storage: multer.memoryStorage() });
const ctrl = BackblazeController.fromEnv();

export const routesBackblaze = Router();

routesBackblaze.get("/media/signed-url", ctrl.signedUrl);
routesBackblaze.get("/media/stream/progressive", ctrl.progressive);
routesBackblaze.use(validateAdminMiddleware);
routesBackblaze.post("/media/upload", upload.single("file"), ctrl.upload);
routesBackblaze.post("/media/rename", ctrl.rename);
routesBackblaze.delete("/media", ctrl.remove);

export default routesBackblaze;
