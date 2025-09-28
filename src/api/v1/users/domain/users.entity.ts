import { TNullableString, TNullableNumber, TNullableDate } from "@app/utils/shared/types";

export class Users {
  constructor(
    public sys_user_id: number,
    public sys_user_id_profile_photo: TNullableNumber,
    public sys_user_id_role: TNullableNumber,
    public sys_user_name: TNullableString,
    public sys_user_lastname: TNullableString,
    public sys_user_email: TNullableString,
    public sys_user_password: TNullableString,
    public sys_user_is_deleted: TNullableNumber,
    public sys_user_create_date: TNullableDate,
    public sys_user_create_id_user: TNullableNumber,
    public sys_user_update_date: TNullableDate,
    public sys_user_update_id_user: TNullableNumber,
  ) {}
}


export interface IUsersRepository {
  create(usersData: Partial<Users>): Promise<Users>;
  findAll(): Promise<Users[]>;
  findById(id: number): Promise<Users | null>;
  findByEmail(email: string): Promise<Users | null>;
  update(id: number, usersData: Partial<Users>): Promise<Users | null>;
  delete(id: number, idUserLogged: number): Promise<void>;
  restore(id: number, idUserLogged: number): Promise<void>;
}
