
import { Languages, ILanguagesRepository } from '@api/languages/domain/languages.entity';
export class LanguagesUseCase {
    constructor(private readonly languagesRepository: ILanguagesRepository) { }

    async listLanguages(): Promise<Languages[]> {
        return await this.languagesRepository.findAll();
    }

    async getLanguagesById(id: number): Promise<Languages | null> {
        return await this.languagesRepository.findById(id);
    }
}
