import { FIREBASE_ERROR_CODE } from "@ncl/app/shared";

export const getFirebaseCodeMessage = (code: string): string => {
  return FIREBASE_ERROR_CODE[code] || code;
};
