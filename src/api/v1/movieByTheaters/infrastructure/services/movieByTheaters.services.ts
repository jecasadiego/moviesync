
import { MovieByTheatersUseCase } from "@api/movieByTheaters/application/movieByTheaters.usecase";
import { MovieByTheatersRepository } from "@api/movieByTheaters/infrastructure/repository/movieByTheaters.repository";

export const movieByTheatersRepository = new MovieByTheatersRepository();

export const movieByTheatersUseCase = new MovieByTheatersUseCase(movieByTheatersRepository);
