
import { IMovieByTheatersRepository } from '@api/movieByTheaters/domain/movieByTheaters.entity';
import { MovieByTheatersModel } from '@api/movieByTheaters/infrastructure/model/movieByTheaters.model';

export class MovieByTheatersRepository implements IMovieByTheatersRepository {
  async findAll(): Promise<MovieByTheatersModel[]> {
    return await MovieByTheatersModel.findAll();
  }

  async findById(id: number): Promise<MovieByTheatersModel | null> {
    return await MovieByTheatersModel.findByPk(id);
  }

  async create(movieByTheatersData: Partial<MovieByTheatersModel>): Promise<MovieByTheatersModel> {
    return await MovieByTheatersModel.create(movieByTheatersData);
  }

  async update(id: number, movieByTheatersData: Partial<MovieByTheatersModel>): Promise<MovieByTheatersModel> {
    const moviebytheaters = await MovieByTheatersModel.findByPk(id);
    if (!moviebytheaters) throw new Error('MovieByTheaters not found');
    return await moviebytheaters.update(movieByTheatersData);
  }

  async delete(id: number, idUserLogged: number): Promise<void> {
    const moviebytheaters = await MovieByTheatersModel.findByPk(id);
    if (!moviebytheaters) throw new Error('MovieByTheaters not found');
    await moviebytheaters.update({ movies_by_theater_is_deleted: true, movies_by_theater_create_id_user: idUserLogged });
  }

  async restore(id: number, idUserLogged: number): Promise<void> {
    const moviebytheaters = await MovieByTheatersModel.scope('deleted').findByPk(id);
    if (!moviebytheaters) throw new Error('MovieByTheaters not found');
    await moviebytheaters.update({ movies_by_theater_is_deleted: false, movies_by_theater_create_id_user: idUserLogged });
  }
}
