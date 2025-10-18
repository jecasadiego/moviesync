
import { LanguagesByMoviesUseCase } from "@api/languagesByMovies/application/languagesByMovies.usecase";
import { LanguagesByMoviesRepository } from "@api/languagesByMovies/infrastructure/repository/languagesByMovies.repository";

export const languagesByMoviesRepository = new LanguagesByMoviesRepository();

export const languagesByMoviesUseCase = new LanguagesByMoviesUseCase(languagesByMoviesRepository);