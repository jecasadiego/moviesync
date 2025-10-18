
import { FileTypes, IFileTypesRepository } from '@api/fileTypes/domain/fileTypes.entity';
import { FileTypesModel } from '@api/fileTypes/infrastructure/model/fileTypes.model';
  
export class FileTypesRepository implements IFileTypesRepository {
  async findAll(): Promise<FileTypesModel[]> {
     return await FileTypesModel.findAll();
  }
  
  async findById(id: number): Promise<FileTypesModel | null> {
    return await FileTypesModel.findByPk(id);
  }

  async findByExtension(extension: string): Promise<FileTypes | null> {
    return await FileTypesModel.findOne({ where: { sys_file_type_name: extension } });
  }
}
