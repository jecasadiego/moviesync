import { TNullableNumber, TNullableDate } from "@app/utils/shared/types";
import { Transaction } from "sequelize";

export class LanguagesByMovies {
  constructor(
    public language_by_movie_id: number,
    public language_by_movie_id_language: TNullableNumber,
    public language_by_movie_id_movie: TNullableNumber,
    public language_by_movie_id_url_sound: TNullableNumber,
    public language_by_movie_is_deleted: TNullableNumber,
    public language_by_movie_create_date: TNullableDate,
    public language_by_movie_update_date: TNullableDate,
    public language_by_movie_create_id_user: TNullableNumber,
    public language_by_movie_update_id_user: TNullableNumber,
  ) {}
}


export interface ILanguagesByMoviesRepository {
  create(languagesByMoviesData: Partial<LanguagesByMovies>, transaction?: Transaction): Promise<LanguagesByMovies>;
  findAll(): Promise<LanguagesByMovies[]>;
  findById(id: number): Promise<LanguagesByMovies | null>;
  findAllByMovieId(id: number): Promise<LanguagesByMovies[]>;
  update(id: number, languagesByMoviesData: Partial<LanguagesByMovies>): Promise<LanguagesByMovies | null>;
  delete(id: number, idUserLogged: number): Promise<void>;
  restore(id: number, idUserLogged: number): Promise<void>;
}
