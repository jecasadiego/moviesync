import { TNullableNumber, TNullableDate } from "@app/utils/shared/types";
import { Transaction } from "sequelize";
import { GenericUrls } from "../../genericUrls/domain/genericUrls.entity";

export class UrlsMoviesImages {
  constructor(
    public url_movies_id: number,
    public url_movies_id_movie: TNullableNumber,
    public url_movies_id_images: TNullableNumber,
    public url_movies_create_date: TNullableDate,
    public url_movies_update_date: TNullableDate,
    public url_movies_create_id_user: TNullableNumber,
    public url_movies_update_id_user: TNullableNumber,
    public images?: GenericUrls
  ) { }
}


export interface IUrlsMoviesImagesRepository {
  create(urlsMoviesImagesData: Partial<UrlsMoviesImages>, transaction?: Transaction): Promise<UrlsMoviesImages>;
  findAll(): Promise<UrlsMoviesImages[]>;
  findById(id: number): Promise<UrlsMoviesImages | null>;
  findAllByMovieId(id: number): Promise<UrlsMoviesImages[]>;
  update(id: number, urlsMoviesImagesData: Partial<UrlsMoviesImages>): Promise<UrlsMoviesImages | null>;
}
