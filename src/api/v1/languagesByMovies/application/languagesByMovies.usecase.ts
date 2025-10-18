
import { LanguagesByMovies, ILanguagesByMoviesRepository } from '@api/languagesByMovies/domain/languagesByMovies.entity';
import { validateFields } from '@app/utils/validations';
import { languagesByMoviesOmitKeys, languagesByMoviesNotNullKeys } from '@api/languagesByMovies/domain/languagesByMovies.value';
import { Transaction } from 'sequelize';

export class LanguagesByMoviesUseCase {
    constructor(private readonly languagesByMoviesRepository: ILanguagesByMoviesRepository) { }

    async listLanguagesByMovies(): Promise<LanguagesByMovies[]> {
        return await this.languagesByMoviesRepository.findAll();
    }

    async getLanguagesByMoviesById(id: number): Promise<LanguagesByMovies | null> {
        return await this.languagesByMoviesRepository.findById(id);
    }

    async getLanguagesByMoviesByMovieId(id: number): Promise<LanguagesByMovies[]> {
        return await this.languagesByMoviesRepository.findAllByMovieId(id);
    }

    async createLanguagesByMovies(languagesByMoviesData: Partial<LanguagesByMovies>, idUserLogged: number, transaction?: Transaction): Promise<LanguagesByMovies> {
        await validateFields(languagesByMoviesData,languagesByMoviesNotNullKeys, languagesByMoviesOmitKeys);
        const languagesByMoviesToCreate: Partial<LanguagesByMovies> = {
            ...languagesByMoviesData,
            language_by_movie_create_id_user: idUserLogged
        }
        return await this.languagesByMoviesRepository.create(languagesByMoviesToCreate, transaction);
    }

    public async updateLanguagesByMovies(id: number, languagesByMoviesData: Partial<LanguagesByMovies>, idUserLogged: number): Promise<LanguagesByMovies | null> {
        await validateFields(languagesByMoviesData,[], languagesByMoviesOmitKeys);
        const languagesByMoviesToUpdate: Partial<LanguagesByMovies> = {
            ...languagesByMoviesData,
            language_by_movie_update_id_user: idUserLogged
        }
        return await this.languagesByMoviesRepository.update(id, languagesByMoviesToUpdate);
    }

    async deleteLanguagesByMovies(id: number, idUserLogged: number): Promise<void> {
        return await this.languagesByMoviesRepository.delete(id, idUserLogged);
    }

    async restoreLanguagesByMovies(id: number, idUserLogged: number): Promise<void> {
        return await this.languagesByMoviesRepository.restore(id, idUserLogged);
    }
}
