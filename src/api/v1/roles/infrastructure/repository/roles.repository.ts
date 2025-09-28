
import { IRolesRepository } from '@api/roles/domain/roles.entity';
import { RolesModel } from '@api/roles/infrastructure/model/roles.model';
  
export class RolesRepository implements IRolesRepository {
  async findAll(): Promise<RolesModel[]> {
     return await RolesModel.findAll();
  }
  
  async findById(id: number): Promise<RolesModel | null> {
    return await RolesModel.findByPk(id);
  }

  async findBySlug(slug: string): Promise<RolesModel | null> {
    return await RolesModel.findOne({ where: { sys_role_name_slug_i_value: slug } });
  }
  
  async create(rolesData: Partial<RolesModel>): Promise<RolesModel> {
    return await RolesModel.create(rolesData);
  }
  
  async update(id: number, rolesData: Partial<RolesModel>): Promise<RolesModel> {
    const roles = await RolesModel.findByPk(id);
    if (!roles) throw new Error('Roles not found');
    return await roles.update(rolesData);
  }
  
  async delete(id: number, idUserLogged: number): Promise<void> {
    const roles = await RolesModel.findByPk(id);
    if (!roles) throw new Error('Roles not found');
    await roles.update({ sys_role_is_deleted: true, sys_role_created_id_user: idUserLogged });
  }

  async restore(id: number, idUserLogged: number): Promise<void> {
    const roles = await RolesModel.scope('deleted').findByPk(id);
    if (!roles) throw new Error('Roles not found');
    await roles.update({ sys_role_is_deleted: false, sys_role_created_id_user: idUserLogged });
  }
}
