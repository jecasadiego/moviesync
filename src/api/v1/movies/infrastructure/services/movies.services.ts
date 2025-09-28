
import { MoviesController } from "@api/movies/infrastructure/controller/movies.controller";
import { MoviesUseCase } from "@api/movies/application/movies.usecase";
import { MoviesRepository } from "@api/movies/infrastructure/repository/movies.repository";

export const moviesRepository = new MoviesRepository();

export const moviesUseCase = new MoviesUseCase(moviesRepository);

export const moviesController = new MoviesController(moviesUseCase);
