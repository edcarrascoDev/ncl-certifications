import { RoleEnum } from "@ncl/app/shared/enums";
import { StandardDocumentData } from "@ncl/app/shared/models";

export interface UserData extends StandardDocumentData {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  companyName: string;
  companyId: string;
  role: RoleEnum;
}
