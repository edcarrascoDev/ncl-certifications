import admin from "firebase-admin";

import serviceAccount from "./service-account-key.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const auth = admin.auth();
export const firestore = admin.firestore();
