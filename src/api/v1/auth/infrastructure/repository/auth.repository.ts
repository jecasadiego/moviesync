import { UsersRepository } from '@api/users/infrastructure/repository/users.repository';

export class AuthRepository {
    private readonly users = new UsersRepository();

    findActiveUserByEmail(email: string) {
        return this.users.findByEmail(email);
    }

    findPublicById(id: number) {
        return this.users.findById(id);
    }

    createUser(data: {
        name: string; lastname: string; email: string; passwordHash: string; roleId?: number | null; createdBy?: number | null;
    }) {
        return this.users.create({
            sys_user_name: data.name,
            sys_user_lastname: data.lastname,
            sys_user_email: data.email,
            sys_user_password: data.passwordHash,
            sys_user_id_role: data.roleId,
            sys_user_create_id_user: data.createdBy
        });
    }
}
