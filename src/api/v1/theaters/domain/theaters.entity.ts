import { TNullableString, TNullableNumber, TNullableDate } from "@app/utils/shared/types";

export class Theaters {
  constructor(
    public theater_id: number,
    public theater_name: TNullableString,
    public theater_latitude: number,
    public theater_longitude: number,
    public theater_description: TNullableString,
    public theater_is_deleted: TNullableNumber,
    public theater_create_date: TNullableDate,
    public theater_update_date: TNullableDate,
    public theater_create_id_user: TNullableNumber,
    public theater_update_id_user: TNullableNumber,
  ) { }
}


export interface ITheatersRepository {
  create(theatersData: Partial<Theaters>): Promise<Theaters>;
  findAll(): Promise<Theaters[]>;
  findById(id: number): Promise<Theaters | null>;
  update(id: number, theatersData: Partial<Theaters>): Promise<Theaters | null>;
  delete(id: number, idUserLogged: number): Promise<void>;
  restore(id: number, idUserLogged: number): Promise<void>;
}
