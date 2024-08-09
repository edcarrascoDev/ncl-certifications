import {
  type User,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
  createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase,
} from "firebase/auth";
import { auth, db } from "@ncl/app/lib/firebase/firebase.config";
import { doc, setDoc } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";
import { UserData } from "@ncl/app/shared/models";
import { StatusResponseEnum } from "@ncl/app/shared/enums";

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(auth, callback);
}

export async function signInWithEmailAndPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const result = await signInWithEmailAndPasswordFirebase(
      auth,
      email,
      password,
    );

    if (!result || !result.user) {
      throw new Error("sign in failed");
    }
    return { status: StatusResponseEnum.success, result: result.user.uid };
  } catch (error: any) {
    console.error("Error signing in", { error: error.code });
    return { error: error.code, status: StatusResponseEnum.failed };
  }
}

export async function createUserWithEmailAndPassword(data: UserData) {
  try {
    const { name, lastName, email, password } = data;
    const userCredential = await createUserWithEmailAndPasswordFirebase(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    if (!userCredential || !userCredential.user) {
      throw new Error("sign Up failed");
    }

    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        ...data,
        id: user.uid,
      });

      await updateProfile(user, {
        displayName: `${name} ${lastName}`,
      });

      return { status: StatusResponseEnum.success, result: user };
    }
  } catch (error: any) {
    console.error("Error signing up or adding document: ", error);
    return { error: error.code, status: StatusResponseEnum.failed };
  }
}

export async function signOut() {
  try {
    await auth.signOut();
  } catch (error: any) {
    console.error("Error signing out", error);
    return { error: error.code, status: StatusResponseEnum.failed };
  }
}
