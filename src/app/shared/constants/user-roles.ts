import { RoleEnum } from "@ncl/app/shared/enums";

export interface UserRoles {
  name: string;
  role: RoleEnum;
}

export const USER_ROLES: UserRoles[] = [
  { name: "Administrador", role: RoleEnum.admin },
  { name: "Alistador", role: RoleEnum.preparer },
  { name: "Director", role: RoleEnum.director },
];
