import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  WithFieldValue,
  collection,
  getDocs,
  getDoc,
  query,
  orderBy,
  OrderByDirection,
} from "@firebase/firestore";
import { db } from "@ncl/app/lib/firebase/firebase.config";
import { DocumentData } from "firebase/firestore";
import { RequestResponse } from "@ncl/app/shared/types";

export async function create<TData extends WithFieldValue<DocumentData>>(
  data: TData,
  path: string,
  id?: string,
): Promise<RequestResponse<TData>> {
  try {
    const docRef = id ? doc(db, path, id) : doc(collection(db, path));
    await setDoc(docRef, { ...data, id: docRef.id, createdAt: new Date() });
    return { success: true, result: docRef.id };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function update<TData>(
  id: string,
  data: Partial<TData>,
  path: string,
): Promise<RequestResponse<TData>> {
  try {
    const docRef = doc(db, path, id);
    await updateDoc(docRef, { ...data, updatedAt: new Date() });

    return { success: true, result: docRef.id };
  } catch (error) {
    return { success: false, error: (error as any).code };
  }
}

export async function remove<TData>(
  id: string,
  path: string,
): Promise<RequestResponse<TData>> {
  try {
    const docRef = doc(db, path, id);
    await deleteDoc(docRef);
    return { success: true, result: docRef.id };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function get<TData>(path: string, id: string) {
  const docRef = doc(db, path, id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, result: docSnap.data() as TData };
    } else {
      return { success: false, error: "Document Not Found" };
    }
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function getAll<TData>(
  path: string,
  orderByPath = "createdAt",
  direction: OrderByDirection = "desc",
): Promise<RequestResponse<TData>> {
  try {
    const collectionRef = collection(db, path);
    const querySnapshot = await getDocs(
      query(collectionRef, orderBy(orderByPath, direction)),
    );

    const dataList: TData[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as TData,
    );

    return { success: true, result: dataList };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
