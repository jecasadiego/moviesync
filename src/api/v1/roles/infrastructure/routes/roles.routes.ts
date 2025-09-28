
import { Router } from "express";
import { rolesController } from "@api/roles/infrastructure/services/roles.services";
import { asyncMiddleware, validateAdminMiddleware } from "@app/utils/middlewares";

export const routesRoles = Router();

routesRoles.get("/", asyncMiddleware(rolesController.listRoles));
routesRoles.get("/:id", asyncMiddleware(rolesController.getRolesById));
routesRoles.use(validateAdminMiddleware);
routesRoles.post("/create", asyncMiddleware(rolesController.createRoles));
routesRoles.put("/update/:id", asyncMiddleware(rolesController.updateRoles));
routesRoles.delete("/delete/:id", asyncMiddleware(rolesController.deleteRoles));
routesRoles.put("/restore/:id", asyncMiddleware(rolesController.restoreRoles));
