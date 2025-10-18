
import { ILanguagesByMoviesRepository } from '@api/languagesByMovies/domain/languagesByMovies.entity';
import { LanguagesByMoviesModel } from '@api/languagesByMovies/infrastructure/model/languagesByMovies.model';
import { Transaction } from 'sequelize';
  
export class LanguagesByMoviesRepository implements ILanguagesByMoviesRepository {
  async findAll(): Promise<LanguagesByMoviesModel[]> {
     return await LanguagesByMoviesModel.findAll();
  }
  
  async findById(id: number): Promise<LanguagesByMoviesModel | null> {
    return await LanguagesByMoviesModel.findByPk(id);
  }

  async findAllByMovieId(id: number): Promise<LanguagesByMoviesModel[]> {
    return await LanguagesByMoviesModel.findAll({ where: { language_by_movie_id_movie: id } });
  }
  
  async create(languagesByMoviesData: Partial<LanguagesByMoviesModel>, transaction?: Transaction): Promise<LanguagesByMoviesModel> {
    return await LanguagesByMoviesModel.create(languagesByMoviesData, { transaction });
  }
  
  async update(id: number, languagesByMoviesData: Partial<LanguagesByMoviesModel>): Promise<LanguagesByMoviesModel> {
    const languagesbymovies = await LanguagesByMoviesModel.findByPk(id);
    if (!languagesbymovies) throw new Error('LanguagesByMovies not found');
    return await languagesbymovies.update(languagesByMoviesData);
  }
  
  async delete(id: number, idUserLogged: number): Promise<void> {
    const languagesbymovies = await LanguagesByMoviesModel.findByPk(id);
    if (!languagesbymovies) throw new Error('LanguagesByMovies not found');
    await languagesbymovies.update({ language_by_movie_is_deleted: true, language_by_movie_update_id_user: idUserLogged });
  }

  async restore(id: number, idUserLogged: number): Promise<void> {
    const languagesbymovies = await LanguagesByMoviesModel.scope('deleted').findByPk(id);
    if (!languagesbymovies) throw new Error('LanguagesByMovies not found');
    await languagesbymovies.update({ language_by_movie_is_deleted: false, language_by_movie_update_id_user: idUserLogged });
  }
}
