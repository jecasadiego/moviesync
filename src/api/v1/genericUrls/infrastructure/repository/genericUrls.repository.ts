
import { IGenericUrlsRepository } from '@api/genericUrls/domain/genericUrls.entity';
import { GenericUrlsModel } from '@api/genericUrls/infrastructure/model/genericUrls.model';

export class GenericUrlsRepository implements IGenericUrlsRepository {
  async findAll(): Promise<GenericUrlsModel[]> {
    return await GenericUrlsModel.findAll();
  }

  async findById(id: number): Promise<GenericUrlsModel | null> {
    return await GenericUrlsModel.findByPk(id);
  }

  async create(genericUrlsData: Partial<GenericUrlsModel>): Promise<GenericUrlsModel> {
    return await GenericUrlsModel.create(genericUrlsData);
  }

  async update(id: number, genericUrlsData: Partial<GenericUrlsModel>): Promise<GenericUrlsModel> {
    const genericurls = await GenericUrlsModel.findByPk(id);
    if (!genericurls) throw new Error('GenericUrls not found');
    return await genericurls.update(genericUrlsData);
  }

  async delete(id: number, idUserLogged: number): Promise<void> {
    const genericurls = await GenericUrlsModel.findByPk(id);
    if (!genericurls) throw new Error('GenericUrls not found');
    await genericurls.update({ gene_url_is_deleted: true, gene_url_create_id_user: idUserLogged });
  }

  async restore(id: number, idUserLogged: number): Promise<void> {
    const genericurls = await GenericUrlsModel.scope('deleted').findByPk(id);
    if (!genericurls) throw new Error('GenericUrls not found');
    await genericurls.update({ gene_url_is_deleted: false, gene_url_create_id_user: idUserLogged });
  }
}
