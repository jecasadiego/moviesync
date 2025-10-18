
import { Movies, IMoviesRepository } from '@api/movies/domain/movies.entity';
import { validateFields } from '@app/utils/validations';
import { moviesOmitKeys, moviesNotNullKeys } from '@api/movies/domain/movies.value';
import { getBackblaze } from "@api/backblaze/infrastructure/services/backblaze.provider";
import { genericUrlsUseCase } from '@api/genericUrls/infrastructure/services/genericUrls.services';
import { fileTypesUseCase } from '@api/fileTypes/infrastructure/services/fileTypes.services';
import { urlsMoviesImagesUseCase } from '@api/urlsMoviesImages/infrastructure/services/urlsMoviesImages.services';
import { GenericUrls } from '@api/genericUrls/domain/genericUrls.entity';
import { ulid } from "ulid";
import { getDbInstance } from '@app/app/database';



export class MoviesUseCase {
    constructor(private readonly moviesRepository: IMoviesRepository) { }
    private readonly backBlaze = getBackblaze();

    async listMovies(): Promise<Movies[]> {
        return await this.moviesRepository.findAll();
    }

    async getMoviesById(id: number): Promise<{ movie: Movies, images: {default: string | null, images: string[]} } | null> {
        const movie = await this.moviesRepository.findById(id);
        const imageMovies = movie?.images_movies || [];
        if (!movie) throw new Error('Movies not found');
        let images = [];
        let imageDefault = null;

        for (const image of imageMovies) {
            const backBlazeUrl = await this.backBlaze.signedDownloadUrl({ key: image.images?.gene_url_value as string });
            images.push(backBlazeUrl);
        }

        if (movie.image_default) {
            const backBlazeUrl = await this.backBlaze.signedDownloadUrl({ key: movie.image_default?.gene_url_value as string });
            imageDefault = backBlazeUrl;
        }

        return { movie, images: { default: imageDefault, images} };
    }

    async createMovies(moviesData: Partial<Movies>, idUserLogged: number): Promise<Movies> {
        await validateFields(moviesData, moviesNotNullKeys, moviesOmitKeys);
        const moviesToCreate: Partial<Movies> = {
            ...moviesData,
            movie_create_id_user: idUserLogged
        }
        return await this.moviesRepository.create(moviesToCreate);
    }

    async uploadImageForMovie(movieId: number, files: Express.Multer.File[], idUserLogged: number): Promise<GenericUrls[]> {

        let generalImages: GenericUrls[] = [];
        const fileName = ulid();

        const sequelize = getDbInstance();
        const transaction = await sequelize.transaction();

        try {
            for (const file of files) {
                const key = 'movies/' + movieId + '/images/' + fileName;
                const ext = file.mimetype.split('/')[1];
                const fileType = await fileTypesUseCase.getFIleTypeByExtension(ext);
                if (!fileType) throw new Error('File type not found');

                const generalImage = await genericUrlsUseCase.createGenericUrls({
                    gene_url_format: file.mimetype,
                    gene_url_size: file.size,
                    gene_url_value: key,
                    gene_url_file_type: fileType.sys_file_type_id
                }, idUserLogged, transaction);

                if (!generalImage) throw new Error('Image not created in registry');

                generalImages.push(generalImage);

                await urlsMoviesImagesUseCase.createUrlsMoviesImages({
                    url_movies_id_movie: movieId,
                    url_movies_id_images: generalImage.gene_url_id,
                }, idUserLogged, transaction);

                await this.backBlaze.uploadBuffer(file.buffer, { key: key, contentType: file.mimetype });

            }

            await this.moviesRepository.update(movieId, {
                movie_update_id_user: idUserLogged
            });

            await transaction.commit();

            return generalImages;
        } catch (e) {
            console.error(e);
            await transaction.rollback();
            throw new Error('Error in upload image for movie');
        }
    }

    public async updateMovies(id: number, moviesData: Partial<Movies>, idUserLogged: number): Promise<Movies | null> {
        await validateFields(moviesData, [], moviesOmitKeys);
        const moviesToUpdate: Partial<Movies> = {
            ...moviesData,
            movie_update_id_user: idUserLogged
        }
        return await this.moviesRepository.update(id, moviesToUpdate);
    }

    async deleteMovies(id: number, idUserLogged: number): Promise<void> {
        return await this.moviesRepository.delete(id, idUserLogged);
    }

    async restoreMovies(id: number, idUserLogged: number): Promise<void> {
        return await this.moviesRepository.restore(id, idUserLogged);
    }
}
