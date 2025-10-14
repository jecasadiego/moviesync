
import { GenericUrlsController } from "@api/genericUrls/infrastructure/controller/genericUrls.controller";
import { GenericUrlsUseCase } from "@api/genericUrls/application/genericUrls.usecase";
import { GenericUrlsRepository } from "@api/genericUrls/infrastructure/repository/genericUrls.repository";

export const genericUrlsRepository = new GenericUrlsRepository();

export const genericUrlsUseCase = new GenericUrlsUseCase(genericUrlsRepository);

export const genericUrlsController = new GenericUrlsController(genericUrlsUseCase);
