
import { Router } from "express";
import { theatersController } from "@api/theaters/infrastructure/services/theaters.services";
import { asyncMiddleware } from "@app/utils/middlewares";

export const routesTheaters = Router();

routesTheaters.get("/", asyncMiddleware(theatersController.listTheaters));
routesTheaters.get("/:id", asyncMiddleware(theatersController.getTheatersById));
routesTheaters.post("/create", asyncMiddleware(theatersController.createTheaters));
routesTheaters.put("/update/:id", asyncMiddleware(theatersController.updateTheaters));
routesTheaters.delete("/delete/:id", asyncMiddleware(theatersController.deleteTheaters));
routesTheaters.put("/restore/:id", asyncMiddleware(theatersController.restoreTheaters));
