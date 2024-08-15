import { RequestResponse } from "@ncl/app/shared/types";
import { auth } from "@ncl/app/lib/firebase/firebase.config";

export const fetchRequest = async <TData>(
  url: string,
  body: Record<string, any>,
  method: string = "POST",
  headers: Record<string, string> = {},
): Promise<RequestResponse<TData>> => {
  try {
    const token = await auth.currentUser?.getIdToken();

    const defaultHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...headers,
    };

    const response = await fetch(url, {
      method,
      headers: defaultHeaders,
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        result,
      };
    } else {
      console.log(result);
      throw new Error(result.code || result);
    }
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};
