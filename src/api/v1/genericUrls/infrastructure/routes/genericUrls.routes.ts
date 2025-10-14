
import { Router } from "express";
import { genericUrlsController } from "@api/genericUrls/infrastructure/services/genericUrls.services";
import { asyncMiddleware } from "@app/utils/middlewares";

export const routesGenericUrls = Router();

routesGenericUrls.get("/", asyncMiddleware(genericUrlsController.listGenericUrls));
routesGenericUrls.get("/:id", asyncMiddleware(genericUrlsController.getGenericUrlsById));
routesGenericUrls.post("/create", asyncMiddleware(genericUrlsController.createGenericUrls));
routesGenericUrls.put("/update/:id", asyncMiddleware(genericUrlsController.updateGenericUrls));
routesGenericUrls.delete("/delete/:id", asyncMiddleware(genericUrlsController.deleteGenericUrls));
routesGenericUrls.put("/restore/:id", asyncMiddleware(genericUrlsController.restoreGenericUrls));
