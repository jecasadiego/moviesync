
import { FileTypesController } from "@api/fileTypes/infrastructure/controller/fileTypes.controller";
import { FileTypesUseCase } from "@api/fileTypes/application/fileTypes.usecase";
import { FileTypesRepository } from "@api/fileTypes/infrastructure/repository/fileTypes.repository";

export const fileTypesRepository = new FileTypesRepository();

export const fileTypesUseCase = new FileTypesUseCase(fileTypesRepository);

export const fileTypesController = new FileTypesController(fileTypesUseCase);
