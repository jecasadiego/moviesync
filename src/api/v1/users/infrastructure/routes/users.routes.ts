
import { Router } from "express";
import { usersController } from "@api/users/infrastructure/services/users.services";
import { asyncMiddleware, validateAdminMiddleware } from "@app/utils/middlewares";

export const routesUsers = Router();

routesUsers.get("/", asyncMiddleware(usersController.listUsers));
routesUsers.get("/:id", asyncMiddleware(usersController.getUsersById));
routesUsers.use(validateAdminMiddleware);
routesUsers.post("/create", asyncMiddleware(usersController.createUsers));
routesUsers.put("/update/:id", asyncMiddleware(usersController.updateUsers));
routesUsers.delete("/delete/:id", asyncMiddleware(usersController.deleteUsers));
routesUsers.put("/restore/:id", asyncMiddleware(usersController.restoreUsers));
