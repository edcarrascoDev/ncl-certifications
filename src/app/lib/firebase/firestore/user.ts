import {
  create,
  update,
  remove,
  getAll,
} from "@ncl/app/lib/firebase/firestore/utils";
import { RequestResponse } from "@ncl/app/shared/types";
import { UserData } from "@ncl/app/shared/models";

const PATH = "users";

export async function createUser(
  data: UserData,
): Promise<RequestResponse<UserData>> {
  return await create<UserData>(data, PATH);
}

export async function updateUser(
  data: UserData,
): Promise<RequestResponse<UserData>> {
  return await update<UserData>(data.id, data, PATH);
}

export async function removeUser(id: string): Promise<RequestResponse<string>> {
  return await remove<string>(id, PATH);
}

export async function getAllUsers(): Promise<RequestResponse<UserData[]>> {
  return await getAll<UserData[]>(PATH);
}
