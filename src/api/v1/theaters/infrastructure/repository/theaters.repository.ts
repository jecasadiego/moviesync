
import { ITheatersRepository } from '@api/theaters/domain/theaters.entity';
import { TheatersModel } from '@api/theaters/infrastructure/model/theaters.model';
import { GenericUrlsModel } from '@app/api/v1/genericUrls/infrastructure/model/genericUrls.model';
import { MoviesModel } from '@app/api/v1/movies/infrastructure/model/movies.model';

export class TheatersRepository implements ITheatersRepository {
  async findAll(): Promise<TheatersModel[]> {
    return await TheatersModel.findAll();
  }

  async findById(id: number): Promise<TheatersModel | null> {
    return await TheatersModel.findByPk(id, {
      include: [
        {
          model: MoviesModel, 
          as: 'movies_by_theater', 
          through: { attributes: [] },
          include: [{
            model: GenericUrlsModel,
            as: 'image_default',
            attributes: ['gene_url_id', 'gene_url_value'],
            required: false
          }]
        }
      ]
    });
  }

  async create(theatersData: Partial<TheatersModel>): Promise<TheatersModel> {
    return await TheatersModel.create(theatersData);
  }

  async update(id: number, theatersData: Partial<TheatersModel>): Promise<TheatersModel> {
    const theaters = await TheatersModel.findByPk(id);
    if (!theaters) throw new Error('Theaters not found');
    return await theaters.update(theatersData);
  }

  async delete(id: number, idUserLogged: number): Promise<void> {
    const theaters = await TheatersModel.findByPk(id);
    if (!theaters) throw new Error('Theaters not found');
    await theaters.update({ theater_is_deleted: true, theater_update_id_user: idUserLogged });
  }

  async restore(id: number, idUserLogged: number): Promise<void> {
    const theaters = await TheatersModel.scope('deleted').findByPk(id);
    if (!theaters) throw new Error('Theaters not found');
    await theaters.update({ theater_is_deleted: false, theater_update_id_user: idUserLogged });
  }
}
