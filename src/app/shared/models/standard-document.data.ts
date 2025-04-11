import { Timestamp } from "firebase/firestore";

export interface StandardDocumentData {
  id?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
