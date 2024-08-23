import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@ncl/lib/utils/verify-token";
import { firestore } from "@ncl/lib/firebase-admin-config";
import { PrepareDocument } from "@ncl/app/shared/models";
import { sendErrorResponse } from "@ncl/lib/utils/send-error-response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("Getting documents");
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { licensePlate, companyId } = req.body;

    if (!licensePlate || !companyId) {
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

    const docs = await firestore
      .collection("prepare-documents")
      .where("licensePlate", "==", licensePlate)
      .get();

    console.log("size", docs.size);

    const filteredDocs = docs.docs
      .map((doc) => doc.data() as PrepareDocument)
      .filter(
        (item) =>
          user.customClaims?.admin ||
          (user.customClaims?.director && item.companyId === companyId) ||
          item.preparerID === user.uid,
      );

    return res.status(200).json(filteredDocs);
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
