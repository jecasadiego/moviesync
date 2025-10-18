
import { FileTypes, IFileTypesRepository } from '@api/fileTypes/domain/fileTypes.entity';

export class FileTypesUseCase {
    constructor(private readonly fileTypesRepository: IFileTypesRepository) { }

    async listFileTypes(): Promise<FileTypes[]> {
        return await this.fileTypesRepository.findAll();
    }

    async getFileTypesById(id: number): Promise<FileTypes | null> {
        return await this.fileTypesRepository.findById(id);
    }

    async getFIleTypeByExtension(extension: string): Promise<FileTypes | null> {
        return await this.fileTypesRepository.findByExtension(extension);
    }

}
