
import { UrlsMoviesImages, IUrlsMoviesImagesRepository } from '@api/urlsMoviesImages/domain/urlsMoviesImages.entity';
import { validateFields } from '@app/utils/validations';
import { urlsMoviesImagesOmitKeys, urlsMoviesImagesNotNullKeys } from '@api/urlsMoviesImages/domain/urlsMoviesImages.value';
import { Transaction } from 'sequelize';

export class UrlsMoviesImagesUseCase {
    constructor(private readonly urlsMoviesImagesRepository: IUrlsMoviesImagesRepository) { }

    async listUrlsMoviesImages(): Promise<UrlsMoviesImages[]> {
        return await this.urlsMoviesImagesRepository.findAll();
    }

    async getUrlsMoviesImagesById(id: number): Promise<UrlsMoviesImages | null> {
        return await this.urlsMoviesImagesRepository.findById(id);
    }

    async getUrlsMoviesImagesByMovieId(id: number): Promise<UrlsMoviesImages[]> {
        return await this.urlsMoviesImagesRepository.findAllByMovieId(id);
    }

    async createUrlsMoviesImages(urlsMoviesImagesData: Partial<UrlsMoviesImages>, idUserLogged: number, transaction?: Transaction): Promise<UrlsMoviesImages> {
        await validateFields(urlsMoviesImagesData, urlsMoviesImagesNotNullKeys, urlsMoviesImagesOmitKeys);
        const urlsMoviesImagesToCreate: Partial<UrlsMoviesImages> = {
            ...urlsMoviesImagesData,
            url_movies_create_id_user: idUserLogged
        }
        return await this.urlsMoviesImagesRepository.create(urlsMoviesImagesToCreate, transaction);
    }

    public async updateUrlsMoviesImages(id: number, urlsMoviesImagesData: Partial<UrlsMoviesImages>, idUserLogged: number): Promise<UrlsMoviesImages | null> {
        await validateFields(urlsMoviesImagesData, [], urlsMoviesImagesOmitKeys);
        const urlsMoviesImagesToUpdate: Partial<UrlsMoviesImages> = {
            ...urlsMoviesImagesData,
            url_movies_update_id_user: idUserLogged
        }
        return await this.urlsMoviesImagesRepository.update(id, urlsMoviesImagesToUpdate);
    }
}
