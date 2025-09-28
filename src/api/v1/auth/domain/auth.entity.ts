export type LoginDTO = { email: string; password: string };
export type RegisterDTO = {
  name: string; lastname: string; email: string; password: string; roleId?: number | null; createdBy?: number | null;
};

export type PublicUser = {
  id: number; name: string; lastname: string; email: string; roleId: number | null;
};
