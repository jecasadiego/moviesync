
import { TheatersController } from "@api/theaters/infrastructure/controller/theaters.controller";
import { TheatersUseCase } from "@api/theaters/application/theaters.usecase";
import { TheatersRepository } from "@api/theaters/infrastructure/repository/theaters.repository";

export const theatersRepository = new TheatersRepository();

export const theatersUseCase = new TheatersUseCase(theatersRepository);

export const theatersController = new TheatersController(theatersUseCase);
