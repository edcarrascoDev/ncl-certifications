import * as functions from "firebase-functions";

export const onUserCreate = functions.firestore
  .document("users/{userId}")
  .onCreate(async (snapshot) => {
    console.log(snapshot);
    return Promise.resolve();
  });
