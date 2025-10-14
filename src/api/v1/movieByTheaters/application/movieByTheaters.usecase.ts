
import { MovieByTheaters, IMovieByTheatersRepository } from '@api/movieByTheaters/domain/movieByTheaters.entity';
import { validateFields } from '@app/utils/validations';
import { movieByTheatersOmitKeys, movieByTheatersNotNullKeys } from '@api/movieByTheaters/domain/movieByTheaters.value';

export class MovieByTheatersUseCase {
    constructor(private readonly movieByTheatersRepository: IMovieByTheatersRepository) { }

    async listMovieByTheaters(): Promise<MovieByTheaters[]> {
        return await this.movieByTheatersRepository.findAll();
    }

    async getMovieByTheatersById(id: number): Promise<MovieByTheaters | null> {
        return await this.movieByTheatersRepository.findById(id);
    }

    async createMovieByTheaters(movieByTheatersData: Partial<MovieByTheaters>, idUserLogged: number): Promise<MovieByTheaters> {
        await validateFields(movieByTheatersData,movieByTheatersNotNullKeys, movieByTheatersOmitKeys);
        const movieByTheatersToCreate: Partial<MovieByTheaters> = {
            ...movieByTheatersData,
            movies_by_theater_update_id_user: idUserLogged
        }
        return await this.movieByTheatersRepository.create(movieByTheatersToCreate);
    }

    public async updateMovieByTheaters(id: number, movieByTheatersData: Partial<MovieByTheaters>, idUserLogged: number): Promise<MovieByTheaters | null> {
        await validateFields(movieByTheatersData,[], movieByTheatersOmitKeys);
        const movieByTheatersToUpdate: Partial<MovieByTheaters> = {
            ...movieByTheatersData,
            movies_by_theater_create_id_user: idUserLogged
        }
        return await this.movieByTheatersRepository.update(id, movieByTheatersToUpdate);
    }

    async deleteMovieByTheaters(id: number, idUserLogged: number): Promise<void> {
        return await this.movieByTheatersRepository.delete(id, idUserLogged);
    }

    async restoreMovieByTheaters(id: number, idUserLogged: number): Promise<void> {
        return await this.movieByTheatersRepository.restore(id, idUserLogged);
    }
}
