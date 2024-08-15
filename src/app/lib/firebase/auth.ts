import {
  type User,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
  fetchSignInMethodsForEmail,
  UserCredential,
} from "firebase/auth";
import { auth } from "@ncl/app/lib/firebase/firebase.config";
import { UserData } from "@ncl/app/shared/models";
import { RequestResponse } from "@ncl/app/shared/types";

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(auth, callback);
}

export async function signInWithEmailAndPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<RequestResponse<UserCredential>> {
  try {
    const result = await signInWithEmailAndPasswordFirebase(
      auth,
      email,
      password,
    );

    if (!result || !result.user) {
      throw new Error("sign in failed");
    }
    return { success: true, result: result };
  } catch (error: any) {
    console.error("Error signing in", { error: error.code });
    return { error: error.code, success: false };
  }
}

export async function createUserWithEmailAndPassword(
  data: UserData,
): Promise<RequestResponse<UserData>> {
  try {
    console.log(data.email);
    const signInMethods = await fetchSignInMethodsForEmail(auth, data.email);

    console.log(signInMethods);

    if (signInMethods.length > 0) {
      return {
        success: false,
        error: "auth/email-already-exists",
      };
    }
    // return await createUser(data);
    return {
      success: false,
      error: "auth/email-already-exists",
    };
  } catch (error: any) {
    console.error("Error signing up or adding document: ", error);
    return { error: error.code, success: false };
  }
}

export async function signOut(): Promise<RequestResponse<string>> {
  try {
    await auth.signOut();
    return { success: true };
  } catch (error: any) {
    console.error("Error signing out", error);
    return { error: error.code, success: false };
  }
}
