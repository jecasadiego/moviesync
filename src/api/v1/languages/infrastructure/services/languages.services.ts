
import { LanguagesController } from "@api/languages/infrastructure/controller/languages.controller";
import { LanguagesUseCase } from "@api/languages/application/languages.usecase";
import { LanguagesRepository } from "@api/languages/infrastructure/repository/languages.repository";

export const languagesRepository = new LanguagesRepository();

export const languagesUseCase = new LanguagesUseCase(languagesRepository);

export const languagesController = new LanguagesController(languagesUseCase);
