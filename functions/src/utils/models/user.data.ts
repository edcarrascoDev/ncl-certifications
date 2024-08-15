import { StandardDocumentData } from "./standard-document.data";
import { RoleEnum } from "../enums";

export interface UserData extends StandardDocumentData {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  password?: string;
  companyName: string;
  companyId: string;
  role: RoleEnum;
}
