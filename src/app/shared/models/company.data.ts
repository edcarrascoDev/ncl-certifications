import { StandardDocumentData } from "@ncl/app/shared/models/standard-document.data";

export interface CompanyData extends StandardDocumentData {
  name: string;
  email: string;
  phone: string;
  address: string;
  address2?: string;
  documentIdType: "NIT" | "RUT";
  documentId: number | null;
  logo?: any;
}
