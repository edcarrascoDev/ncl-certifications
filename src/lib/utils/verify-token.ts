import { auth } from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";
import UserRecord = auth.UserRecord;

export async function verifyToken(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<UserRecord | null> {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    res
      .status(401)
      .json({ code: "auth/unauthorized-user", message: "No token provided" });
    return null;
  }

  try {
    const decodedToken = await auth().verifyIdToken(token);

    const user = await auth().getUser(decodedToken.uid);
    if (!user) {
      res.status(403).json({
        code: "auth/unauthorized-user",
        message: "No Claims provided",
      });
    }

    return user;
  } catch (error) {
    console.error("Error verifying token", error);
    res.status(500).json({
      code: "auth/server-error",
      message: "Internal Server Error",
    });
    return null;
  }
}
