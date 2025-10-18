
import { Theaters, ITheatersRepository } from '@api/theaters/domain/theaters.entity';
import { validateFields } from '@app/utils/validations';
import { theatersOmitKeys, theatersNotNullKeys } from '@api/theaters/domain/theaters.value';
import { getBackblaze } from '@api/backblaze/infrastructure/services/backblaze.provider';

export class TheatersUseCase {
    constructor(private readonly theatersRepository: ITheatersRepository) { }
    private readonly backBlaze = getBackblaze();

    async listTheaters(): Promise<Theaters[]> {
        return await this.theatersRepository.findAll();
    }

    async getTheatersById(id: number): Promise<Theaters | null> {
        const theater = await this.theatersRepository.findById(id);

        for (const movie of theater?.movies_by_theater || []) {
            if (movie.image_default) {
                const backBlazeUrl = await this.backBlaze.signedDownloadUrl({ key: movie.image_default?.gene_url_value as string });
                movie.image_default.gene_url_value = backBlazeUrl;
            }
        }
        return theater;

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
