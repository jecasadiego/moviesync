import { TNullableString, TNullableNumber, TNullableDate } from "@app/utils/shared/types";

export class Languages {
  constructor(
    public language_id: number,
    public language_name: TNullableString,
    public language_description: TNullableString,
    public language_is_deleted: TNullableNumber,
    public language_create_date: TNullableDate,
    public language_update_date: TNullableDate,
    public language_create_id_user: TNullableNumber,
    public language_update_id_user: TNullableNumber,
    public language_slug_name: TNullableString
  ) { }
}


export interface ILanguagesRepository {
  create(languagesData: Partial<Languages>): Promise<Languages>;
  findAll(): Promise<Languages[]>;
  findById(id: number): Promise<Languages | null>;
  update(id: number, languagesData: Partial<Languages>): Promise<Languages | null>;
  delete(id: number, idUserLogged: number): Promise<void>;
  restore(id: number, idUserLogged: number): Promise<void>;
}
