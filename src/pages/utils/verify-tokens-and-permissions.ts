import { getAuth } from "firebase-admin/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export async function verifyTokensAndPermissions(
  req: NextApiRequest,
  res: NextApiResponse,
  requiredClaims: Record<string, boolean> = {},
): Promise<boolean> {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    res
      .status(401)
      .json({ code: "auth/unauthorized-user", message: "No token provided" });
    return false;
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(token);

    const user = await getAuth().getUser(decodedToken.uid);
    if (!user.customClaims) {
      res.status(403).json({
        code: "auth/unauthorized-user",
        message: "No Claims provided",
      });
      return false;
    }

    for (const [claim, expectedValue] of Object.entries(requiredClaims)) {
      if (user.customClaims[claim] !== expectedValue) {
        res.status(403).json({
          code: "auth/unauthorized-user",
          message: "No Valid Claims",
        });
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Error verifying token or checking claims:", error);
    res.status(500).json({
      code: "auth/server-error",
      message: "Internal Server Error",
    });
    return false;
  }
}
