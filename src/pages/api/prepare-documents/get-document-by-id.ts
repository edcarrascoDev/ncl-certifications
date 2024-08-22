import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@ncl/lib/utils/verify-token";
import { firestore } from "@ncl/lib/firebase-admin-config";
import { PrepareDocument } from "@ncl/app/shared/models";
import { sendErrorResponse } from "@ncl/lib/utils/send-error-response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { documentId, companyId } = req.body;

    if (!documentId || !companyId) {
      return sendErrorResponse(
        res,
        400,
        "missing-parameters",
        "Missing required parameters",
      );
    }

    const user = await verifyToken(req, res);

    if (!user) {
      return sendErrorResponse(
        res,
        401,
        "auth/unauthorized-user",
        "Unauthorized",
      );
    }

    const doc = await firestore
      .collection("prepare-documents")
      .doc(documentId)
      .get();

    if (!doc.exists) {
      return sendErrorResponse(
        res,
        404,
        "firestore/document-not-found",
        "Document Not Found",
      );
    }

    const document = doc.data() as PrepareDocument;

    if (
      user.customClaims?.admin ||
      (user.customClaims?.director && document.companyId === companyId) ||
      document.preparerID === user.uid
    ) {
      return res.status(200).json(document);
    } else {
      return sendErrorResponse(res, 403, "forbidden", "Access Denied");
    }
  } catch (error) {
    if (
      (error instanceof Error && "errorInfo" in error) ||
      (error as any).code
    ) {
      const { code, message } = (error as any).errorInfo || error;
      return sendErrorResponse(res, 400, code, message);
    } else {
      return sendErrorResponse(
        res,
        500,
        "unknown-error",
        "An unknown error occurred",
      );
    }
  }
}
