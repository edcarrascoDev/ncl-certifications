import { StandardDocumentData } from "@ncl/app/shared/models/standard-document.data";

export interface CompanyData extends StandardDocumentData {
  name: string;
  email: string;
  phone: string;
  city: string;
  department: string;
  address: string;
  address2?: string;
  documentIdType: "NIT" | "RUT";
  documentId: string;
  logo?: any;
}
