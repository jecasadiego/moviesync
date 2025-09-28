
import { Movies, IMoviesRepository } from '@api/movies/domain/movies.entity';
import { validateFields } from '@app/utils/validations';
import { moviesOmitKeys, moviesNotNullKeys } from '@api/movies/domain/movies.value';

export class MoviesUseCase {
    constructor(private readonly moviesRepository: IMoviesRepository) { }

    async listMovies(): Promise<Movies[]> {
        return await this.moviesRepository.findAll();
    }

    async getMoviesById(id: number): Promise<Movies | null> {
        return await this.moviesRepository.findById(id);
    }

    async createMovies(moviesData: Partial<Movies>, idUserLogged: number): Promise<Movies> {
        await validateFields(moviesData, moviesNotNullKeys, moviesOmitKeys);
        const moviesToCreate: Partial<Movies> = {
            ...moviesData,
            movie_create_id_user: idUserLogged
        }
        return await this.moviesRepository.create(moviesToCreate);
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
