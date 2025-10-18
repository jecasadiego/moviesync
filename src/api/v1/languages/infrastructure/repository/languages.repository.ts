
import { ILanguagesRepository } from '@api/languages/domain/languages.entity';
import { LanguagesModel } from '@api/languages/infrastructure/model/languages.model';

export class LanguagesRepository implements ILanguagesRepository {
  async findAll(): Promise<LanguagesModel[]> {
    return await LanguagesModel.findAll();
  }

  async findById(id: number): Promise<LanguagesModel | null> {
    return await LanguagesModel.findByPk(id);
  }

  async create(languagesData: Partial<LanguagesModel>): Promise<LanguagesModel> {
    return await LanguagesModel.create(languagesData);
  }

  async update(id: number, languagesData: Partial<LanguagesModel>): Promise<LanguagesModel> {
    const languages = await LanguagesModel.findByPk(id);
    if (!languages) throw new Error('Languages not found');
    return await languages.update(languagesData);
  }

  async delete(id: number, idUserLogged: number): Promise<void> {
    const languages = await LanguagesModel.findByPk(id);
    if (!languages) throw new Error('Languages not found');
    await languages.update({ language_is_deleted: true, language_update_id_user: idUserLogged });
  }

  async restore(id: number, idUserLogged: number): Promise<void> {
    const languages = await LanguagesModel.scope('deleted').findByPk(id);
    if (!languages) throw new Error('Languages not found');
    await languages.update({ language_is_deleted: false, language_update_id_user: idUserLogged });
  }
}
