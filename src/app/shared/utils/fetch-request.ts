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

    let defaultHeaders: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      ...headers,
    };

    if (!(body instanceof FormData)) {
      defaultHeaders = {
        ...defaultHeaders,
        "Content-Type": "application/json",
      };
    }

    const response = await fetch(url, {
      method,
      headers: defaultHeaders,
      body: body instanceof FormData ? body : JSON.stringify(body),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        result,
      };
    } else {
      throw new Error(result.code || result);
    }
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};
