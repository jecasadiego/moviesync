
import { Router } from "express";
import { languagesController } from "@api/languages/infrastructure/services/languages.services";
import { asyncMiddleware } from "@app/utils/middlewares";

export const routesLanguages = Router();

routesLanguages.get("/", asyncMiddleware(languagesController.listLanguages));
routesLanguages.get("/:id", asyncMiddleware(languagesController.getLanguagesById));