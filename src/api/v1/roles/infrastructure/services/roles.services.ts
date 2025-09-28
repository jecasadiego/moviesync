
import { RolesController } from "@api/roles/infrastructure/controller/roles.controller";
import { RolesUseCase } from "@api/roles/application/roles.usecase";
import { RolesRepository } from "@api/roles/infrastructure/repository/roles.repository";

export const rolesRepository = new RolesRepository();

export const rolesUseCase = new RolesUseCase(rolesRepository);

export const rolesController = new RolesController(rolesUseCase);
