
import { GenericUrls, IGenericUrlsRepository } from '@api/genericUrls/domain/genericUrls.entity';
import { validateFields } from '@app/utils/validations';
import { genericUrlsOmitKeys, genericUrlsNotNullKeys } from '@api/genericUrls/domain/genericUrls.value';

export class GenericUrlsUseCase {
    constructor(private readonly genericUrlsRepository: IGenericUrlsRepository) { }

    async listGenericUrls(): Promise<GenericUrls[]> {
        return await this.genericUrlsRepository.findAll();
    }

    async getGenericUrlsById(id: number): Promise<GenericUrls | null> {
        return await this.genericUrlsRepository.findById(id);
    }

    async createGenericUrls(genericUrlsData: Partial<GenericUrls>, idUserLogged: number): Promise<GenericUrls> {
        await validateFields(genericUrlsData, genericUrlsNotNullKeys, genericUrlsOmitKeys);
        const genericUrlsToCreate: Partial<GenericUrls> = {
            ...genericUrlsData,
            gene_url_update_id_user: idUserLogged
        }
        return await this.genericUrlsRepository.create(genericUrlsToCreate);
    }

    public async updateGenericUrls(id: number, genericUrlsData: Partial<GenericUrls>, idUserLogged: number): Promise<GenericUrls | null> {
        await validateFields(genericUrlsData, [], genericUrlsOmitKeys);
        const genericUrlsToUpdate: Partial<GenericUrls> = {
            ...genericUrlsData,
            gene_url_create_id_user: idUserLogged
        }
        return await this.genericUrlsRepository.update(id, genericUrlsToUpdate);
    }

    async deleteGenericUrls(id: number, idUserLogged: number): Promise<void> {
        return await this.genericUrlsRepository.delete(id, idUserLogged);
    }

    async restoreGenericUrls(id: number, idUserLogged: number): Promise<void> {
        return await this.genericUrlsRepository.restore(id, idUserLogged);
    }
}
