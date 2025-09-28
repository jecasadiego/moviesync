import { TNullableString, TNullableNumber, TNullableDate } from "@app/utils/shared/types";

export class Roles {
  constructor(
    public sys_role_id: number,
    public sys_role_name: TNullableString,
    public sys_role_description: TNullableString,
    public sys_role_name_slug_i_value: TNullableString,
    public sys_role_is_deleted: TNullableNumber,
    public sys_role_create_date: TNullableDate,
    public sys_role_update_date: TNullableDate,
    public sys_role_update_id_user: TNullableNumber,
    public sys_role_created_id_user: TNullableNumber,
  ) {}
}


export interface IRolesRepository {
  create(rolesData: Partial<Roles>): Promise<Roles>;
  findAll(): Promise<Roles[]>;
  findById(id: number): Promise<Roles | null>;
  findBySlug(slug: string): Promise<Roles | null>;
  update(id: number, rolesData: Partial<Roles>): Promise<Roles | null>;
  delete(id: number, idUserLogged: number): Promise<void>;
  restore(id: number, idUserLogged: number): Promise<void>;
}
