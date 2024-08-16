import type { NextApiRequest, NextApiResponse } from "next";
import { verifyTokensAndPermissions } from "@ncl/lib/utils/verify-tokens-and-permissions";
import { auth, firestore } from "@ncl/lib/firebase-admin-config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      res
        .status(401)
        .json({ code: "auth/unauthorized-user", message: "No token provided" });
      return false;
    }
    const hasPermissions = await verifyTokensAndPermissions(req, res, {
      admin: true,
    });
    try {
      let uid;
      if (hasPermissions) {
        uid = req.body.uid;
      } else {
        const decodedToken = await auth.verifyIdToken(token);
        uid = decodedToken.uid;
      }
      if (!uid) {
        res.status(401).json({
          code: "auth/unauthorized-user",
          message: "No token provided",
        });
      }

      const docRef = firestore.collection("users").doc(uid);
      const doc = await docRef.get();
      if (doc.exists) {
        res.status(201).json({ ...doc.data() });
      } else {
        res.status(404).json({
          code: "auth/user-not-found",
          message: "User Not Found",
        });
      }
    } catch (error) {
      if (
        (error instanceof Error && "errorInfo" in error) ||
        (error as any).code
      ) {
        const { code, message } = (error as any).errorInfo || error;
        res.status(400).json({ code, message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
