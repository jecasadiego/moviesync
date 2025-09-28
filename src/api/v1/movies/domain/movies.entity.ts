import { TNullableString, TNullableNumber, TNullableDate } from "@app/utils/shared/types";

export class Movies {
  constructor(
    public movie_id: number,
    public movie_id_image_default: TNullableNumber,
    public movie_id_status: TNullableNumber,
    public movie_title: TNullableString,
    public movie_description: TNullableString,
    public movie_is_deleted: TNullableNumber,
    public movie_create_date: TNullableDate,
    public movie_update_date: TNullableDate,
    public movie_create_id_user: TNullableNumber,
    public movie_update_id_user: TNullableNumber,
  ) { }
}


export interface IMoviesRepository {
  create(moviesData: Partial<Movies>): Promise<Movies>;
  findAll(): Promise<Movies[]>;
  findById(id: number): Promise<Movies | null>;
  update(id: number, moviesData: Partial<Movies>): Promise<Movies | null>;
  delete(id: number, idUserLogged: number): Promise<void>;
  restore(id: number, idUserLogged: number): Promise<void>;
}
