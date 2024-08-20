"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  DASHBOARD_ROUTE,
  SESSION_COOKIE_NAME,
  ROOT_ROUTE,
  CLAIMS_COOKIE_NAME,
} from "@ncl/app/shared";
import { auth } from "@ncl/lib/firebase-admin-config";

export async function createSession(uid: string) {
  cookies().set(SESSION_COOKIE_NAME, uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // One day
    path: "/",
  });

  const user = await auth.getUser(uid);
  if (user) {
    const userClaims = JSON.stringify(user.customClaims);
    cookies().set(CLAIMS_COOKIE_NAME, userClaims, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // One day
      path: "/",
    });
  }

  redirect(DASHBOARD_ROUTE);
}

export async function removeSession() {
  cookies().delete(SESSION_COOKIE_NAME);

  redirect(ROOT_ROUTE);
}
