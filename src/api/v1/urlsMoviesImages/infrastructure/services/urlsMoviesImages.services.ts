
import { UrlsMoviesImagesUseCase } from "@api/urlsMoviesImages/application/urlsMoviesImages.usecase";
import { UrlsMoviesImagesRepository } from "@api/urlsMoviesImages/infrastructure/repository/urlsMoviesImages.repository";

export const urlsMoviesImagesRepository = new UrlsMoviesImagesRepository();

export const urlsMoviesImagesUseCase = new UrlsMoviesImagesUseCase(urlsMoviesImagesRepository);