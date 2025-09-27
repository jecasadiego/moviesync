
import { UsersController } from "@api/users/infrastructure/controller/users.controller";
import { UsersUseCase } from "@api/users/application/users.usecase";
import { UsersRepository } from "@api/users/infrastructure/repository/users.repository";

export const usersRepository = new UsersRepository();

export const usersUseCase = new UsersUseCase(usersRepository);

export const usersController = new UsersController(usersUseCase);
