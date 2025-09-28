
import { IMoviesRepository } from '@api/movies/domain/movies.entity';
import { MoviesModel } from '@api/movies/infrastructure/model/movies.model';

export class MoviesRepository implements IMoviesRepository {
  async findAll(): Promise<MoviesModel[]> {
    return await MoviesModel.findAll();
  }

  async findById(id: number): Promise<MoviesModel | null> {
    return await MoviesModel.findByPk(id);
  }

  async create(moviesData: Partial<MoviesModel>): Promise<MoviesModel> {
    return await MoviesModel.create(moviesData);
  }

  async update(id: number, moviesData: Partial<MoviesModel>): Promise<MoviesModel> {
    const movies = await MoviesModel.findByPk(id);
    if (!movies) throw new Error('Movies not found');
    return await movies.update(moviesData);
  }

  async delete(id: number, idUserLogged: number): Promise<void> {
    const movies = await MoviesModel.findByPk(id);
    if (!movies) throw new Error('Movies not found');
    await movies.update({ movie_is_deleted: true, movie_update_id_user: idUserLogged });
  }

  async restore(id: number, idUserLogged: number): Promise<void> {
    const movies = await MoviesModel.scope('deleted').findByPk(id);
    if (!movies) throw new Error('Movies not found');
    await movies.update({ movie_is_deleted: false, movie_update_id_user: idUserLogged });
  }
}
