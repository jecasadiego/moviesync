import { TNullableString, TNullableNumber, TNullableDate } from "@app/utils/shared/types";

export class FileTypes {
  constructor(
    public sys_file_type_id: number,
    public sys_file_type_name: TNullableString,
    public sys_file_type_description: TNullableString,
    public sys_file_type_is_deleted: TNullableNumber,
    public sys_file_type_create_date: TNullableDate,
    public sys_file_type_uptade_date: TNullableDate,
    public sys_file_type_update_id_user: TNullableNumber,
    public sys_file_type_create_id_user: TNullableNumber,
  ) {}
}


export interface IFileTypesRepository {
  findAll(): Promise<FileTypes[]>;
  findById(id: number): Promise<FileTypes | null>;
  findByExtension(extension: string): Promise<FileTypes | null>;
}
