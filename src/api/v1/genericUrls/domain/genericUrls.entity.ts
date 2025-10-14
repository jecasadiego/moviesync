import { TNullableString, TNullableNumber, TNullableDate } from "@app/utils/shared/types";

export class GenericUrls {
  constructor(
    public gene_url_id: number,
    public gene_url_file_type: TNullableNumber,
    public gene_url_value: TNullableString,
    public gene_url_format: TNullableString,
    public gene_url_size: number,
    public gene_url_is_deleted: TNullableNumber,
    public gene_url_create_date: TNullableDate,
    public gene_url_update_date: TNullableDate,
    public gene_url_update_id_user: TNullableNumber,
    public gene_url_create_id_user: TNullableNumber,
  ) {}
}


export interface IGenericUrlsRepository {
  create(genericUrlsData: Partial<GenericUrls>): Promise<GenericUrls>;
  findAll(): Promise<GenericUrls[]>;
  findById(id: number): Promise<GenericUrls | null>;
  update(id: number, genericUrlsData: Partial<GenericUrls>): Promise<GenericUrls | null>;
  delete(id: number, idUserLogged: number): Promise<void>;
  restore(id: number, idUserLogged: number): Promise<void>;
}
