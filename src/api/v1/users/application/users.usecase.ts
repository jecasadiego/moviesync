
import { Users, IUsersRepository } from '@api/users/domain/users.entity';
import { validateFields } from '@app/utils/validations';
import { usersOmitKeys, usersNotNullKeys } from '@api/users/domain/users.value';

export class UsersUseCase {
    constructor(private readonly usersRepository: IUsersRepository) { }

    async listUsers(): Promise<Users[]> {
        return await this.usersRepository.findAll();
    }

    async getUsersById(id: number): Promise<Users | null> {
        return await this.usersRepository.findById(id);
    }

    async createUsers(usersData: Partial<Users>, idUserLogged: number): Promise<Users> {
        await validateFields(usersData,usersNotNullKeys, usersOmitKeys);
        const usersToCreate: Partial<Users> = {
            ...usersData,
            sys_user_create_id_user: idUserLogged
        }
        return await this.usersRepository.create(usersToCreate);
    }

    public async updateUsers(id: number, usersData: Partial<Users>, idUserLogged: number): Promise<Users | null> {
        await validateFields(usersData,[], usersOmitKeys);
        const usersToUpdate: Partial<Users> = {
            ...usersData,
            sys_user_update_id_user: idUserLogged
        }
        return await this.usersRepository.update(id, usersToUpdate);
    }

    async deleteUsers(id: number, idUserLogged: number): Promise<void> {
        return await this.usersRepository.delete(id, idUserLogged);
    }

    async restoreUsers(id: number, idUserLogged: number): Promise<void> {
        return await this.usersRepository.restore(id, idUserLogged);
    }
}
