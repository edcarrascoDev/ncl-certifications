import { CompanyData } from "@ncl/app/shared/models/company.data";
import {
  create,
  update,
  remove,
  getAll,
  get,
} from "@ncl/app/lib/firebase/firestore/utils";
import { RequestResponse } from "@ncl/app/shared/types";

const PATH = "companies";

export async function createCompany(
  data: CompanyData,
): Promise<RequestResponse<CompanyData>> {
  return await create<CompanyData>(data, PATH);
}

export async function updateCompany(
  id: string,
  data: CompanyData,
): Promise<RequestResponse<CompanyData>> {
  return await update<CompanyData>(id, data, PATH);
}

export async function removeCompany(
  id: string,
): Promise<RequestResponse<string>> {
  return await remove<string>(id, PATH);
}

export async function getAllCompanies(): Promise<
  RequestResponse<CompanyData[]>
> {
  return await getAll<CompanyData[]>(PATH);
}

export async function getCompanyById(
  id: string,
): Promise<RequestResponse<CompanyData>> {
  return await get<CompanyData>(PATH, id);
}
