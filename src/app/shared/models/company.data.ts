import { StandardDocumentData } from "@ncl/app/shared/models/standard-document.data";

export interface CompanyData extends StandardDocumentData {
  name: string;
  email: string;
  phone: string;
  address: string;
  address2?: string;
  nit: string;
  logo?: any;
}
