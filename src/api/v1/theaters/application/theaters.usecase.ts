
import { Theaters, ITheatersRepository } from '@api/theaters/domain/theaters.entity';
import { validateFields } from '@app/utils/validations';
import { theatersOmitKeys, theatersNotNullKeys } from '@api/theaters/domain/theaters.value';

export class TheatersUseCase {
    constructor(private readonly theatersRepository: ITheatersRepository) { }

    async listTheaters(): Promise<Theaters[]> {
        return await this.theatersRepository.findAll();
    }

    async getTheatersById(id: number): Promise<Theaters | null> {
        return await this.theatersRepository.findById(id);
    }

    async createTheaters(theatersData: Partial<Theaters>, idUserLogged: number): Promise<Theaters> {
        await validateFields(theatersData, theatersNotNullKeys, theatersOmitKeys);
        const theatersToCreate: Partial<Theaters> = {
            ...theatersData,
            theater_create_id_user: idUserLogged
        }
        return await this.theatersRepository.create(theatersToCreate);
    }

    public async updateTheaters(id: number, theatersData: Partial<Theaters>, idUserLogged: number): Promise<Theaters | null> {
        await validateFields(theatersData, [], theatersOmitKeys);
        const theatersToUpdate: Partial<Theaters> = {
            ...theatersData,
            theater_update_id_user: idUserLogged
        }
        return await this.theatersRepository.update(id, theatersToUpdate);
    }

    async deleteTheaters(id: number, idUserLogged: number): Promise<void> {
        return await this.theatersRepository.delete(id, idUserLogged);
    }

    async restoreTheaters(id: number, idUserLogged: number): Promise<void> {
        return await this.theatersRepository.restore(id, idUserLogged);
    }
}
