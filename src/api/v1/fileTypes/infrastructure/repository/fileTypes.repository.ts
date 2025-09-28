
import { IFileTypesRepository } from '@api/fileTypes/domain/fileTypes.entity';
import { FileTypesModel } from '@api/fileTypes/infrastructure/model/fileTypes.model';
  
export class FileTypesRepository implements IFileTypesRepository {
  async findAll(): Promise<FileTypesModel[]> {
     return await FileTypesModel.findAll();
  }
  
  async findById(id: number): Promise<FileTypesModel | null> {
    return await FileTypesModel.findByPk(id);
  }
}
