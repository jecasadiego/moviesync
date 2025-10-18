import { TNullableNumber, TNullableDate } from "@app/utils/shared/types";
import { UrlsMoviesImages } from "../../urlsMoviesImages/domain/urlsMoviesImages.entity";
import { GenericUrls } from "../../genericUrls/domain/genericUrls.entity";

export class Movies {
  constructor(
    public movie_id: number,
    public movie_id_image_default: TNullableNumber,
    public movie_id_status: number,
    public movie_title: string,
    public movie_description: string,
    public movie_is_deleted: TNullableNumber,
    public movie_create_date: Date,
    public movie_update_date: TNullableDate,
    public movie_create_id_user: number,
    public movie_update_id_user: TNullableNumber,
    public images_movies?: UrlsMoviesImages[],
    public image_default?: GenericUrls
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
