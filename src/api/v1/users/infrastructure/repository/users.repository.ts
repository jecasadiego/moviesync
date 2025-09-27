
import { IUsersRepository } from '@api/users/domain/users.entity';
import { UsersModel } from '@api/users/infrastructure/model/users.model';
  
export class UsersRepository implements IUsersRepository {
  async findAll(): Promise<UsersModel[]> {
     return await UsersModel.findAll();
  }
  
  async findById(id: number): Promise<UsersModel | null> {
    return await UsersModel.findByPk(id);
  }

  async findByEmail(email: string): Promise<UsersModel | null> {
    return await UsersModel.findOne({ where: { sys_user_email: email } });
  }
  
  async create(usersData: Partial<UsersModel>): Promise<UsersModel> {
    return await UsersModel.create(usersData);
  }
  
  async update(id: number, usersData: Partial<UsersModel>): Promise<UsersModel> {
    const users = await UsersModel.findByPk(id);
    if (!users) throw new Error('Users not found');
    return await users.update(usersData);
  }
  
  async delete(id: number, idUserLogged: number): Promise<void> {
    const users = await UsersModel.findByPk(id);
    if (!users) throw new Error('Users not found');
    await users.update({ sys_user_is_deleted: true, sys_user_update_id_user: idUserLogged });
  }

  async restore(id: number, idUserLogged: number): Promise<void> {
    const users = await UsersModel.scope('deleted').findByPk(id);
    if (!users) throw new Error('Users not found');
    await users.update({ sys_user_is_deleted: false, sys_user_update_id_user: idUserLogged });
  }
}
