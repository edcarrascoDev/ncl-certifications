import { NextApiRequest, NextApiResponse } from "next";
import { verifyTokensAndPermissions } from "@ncl/lib/utils/verify-tokens-and-permissions";
import { auth, firestore } from "@ncl/lib/firebase-admin-config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "DELETE") {
    const hasPermissions = await verifyTokensAndPermissions(req, res, {
      admin: true,
    });
    if (!hasPermissions) return;

    try {
      await firestore.collection("users").doc(req.body.uid).delete();
      console.log(`User ${req.body.uid} has been deleted from firestore`);

      await auth.deleteUser(req.body.uid);
      console.log(`User ${req.body.uid} has been deleted from Auth`);

      res.status(201).json({ userId: req.body.uid });
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
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
