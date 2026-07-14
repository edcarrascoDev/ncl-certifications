import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@ncl/lib/firebase-admin-config";
import { verifyToken } from "@ncl/lib/utils/verify-token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const userRecord = await verifyToken(req, res);
      if (!userRecord) return;

      if (userRecord.uid !== req.body.userId) {
        res.status(403).json({
          code: "auth/forbidden",
          message: "User ID does not match the requested resource",
        });
        return;
      }

      const doc = await firestore
        .collection("companies")
        .doc(req.body.companyId)
        .get();

      if (doc.exists) {
        res.status(200).json({ ...doc.data() });
      } else {
        res.status(404).json({
          code: "firestore/document-not-found",
          message: "Document Not Found",
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
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
