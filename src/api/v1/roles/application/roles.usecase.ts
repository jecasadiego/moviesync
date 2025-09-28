
import { Roles, IRolesRepository } from '@api/roles/domain/roles.entity';
import { validateFields } from '@app/utils/validations';
import { rolesOmitKeys, rolesNotNullKeys } from '@api/roles/domain/roles.value';

export class RolesUseCase {
    constructor(private readonly rolesRepository: IRolesRepository) { }

    async listRoles(): Promise<Roles[]> {
        return await this.rolesRepository.findAll();
    }

    async getRolesById(id: number): Promise<Roles | null> {
        return await this.rolesRepository.findById(id);
    }

    async getRoleBySlug(slug: string): Promise<Roles | null> {
        return await this.rolesRepository.findBySlug(slug);
    }

    async createRoles(rolesData: Partial<Roles>, idUserLogged: number): Promise<Roles> {
        await validateFields(rolesData,rolesNotNullKeys, rolesOmitKeys);
        const rolesToCreate: Partial<Roles> = {
            ...rolesData,
            sys_role_update_id_user: idUserLogged
        }
        return await this.rolesRepository.create(rolesToCreate);
    }

    public async updateRoles(id: number, rolesData: Partial<Roles>, idUserLogged: number): Promise<Roles | null> {
        await validateFields(rolesData,[], rolesOmitKeys);
        const rolesToUpdate: Partial<Roles> = {
            ...rolesData,
            sys_role_created_id_user: idUserLogged
        }
        return await this.rolesRepository.update(id, rolesToUpdate);
    }

    async deleteRoles(id: number, idUserLogged: number): Promise<void> {
        return await this.rolesRepository.delete(id, idUserLogged);
    }

    async restoreRoles(id: number, idUserLogged: number): Promise<void> {
        return await this.rolesRepository.restore(id, idUserLogged);
    }
}
