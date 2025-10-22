import { Timestamp } from "firebase/firestore";

export interface StandardDocumentData {
  id?: string;
  createdAt?: FirebaseFirestore.Timestamp | Timestamp;
  updatedAt?: FirebaseFirestore.Timestamp | Timestamp;
}
