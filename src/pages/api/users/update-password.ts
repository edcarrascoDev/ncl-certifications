import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@ncl/lib/firebase-admin-config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("start");
  if (req.method === "POST") {
    console.log(req);
    const token = req.headers.authorization?.split("Bearer ")[1];
    console.log(token);
    if (!token) {
      res
        .status(401)
        .json({ code: "auth/unauthorized-user", message: "No token provided" });
      return false;
    }
    try {
      const decodedToken = await auth.verifyIdToken(token);
      const uid = decodedToken.uid;
      console.log(uid);
      if (!uid) {
        res.status(401).json({
          code: "auth/unauthorized-user",
          message: "User ID is missing",
        });
      }
      await auth.updateUser(uid, { password: req.body.password });
      res.status(201).json(true);
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
