
import { Router } from "express";
import { fileTypesController } from "@api/fileTypes/infrastructure/services/fileTypes.services";
import { asyncMiddleware } from "@app/utils/middlewares";

export const routesFileTypes = Router();

routesFileTypes.get("/", asyncMiddleware(fileTypesController.listFileTypes));
routesFileTypes.get("/:id", asyncMiddleware(fileTypesController.getFileTypesById));
