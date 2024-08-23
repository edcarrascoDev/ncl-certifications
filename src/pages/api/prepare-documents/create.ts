import formidable, { IncomingForm } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyTokensAndPermissions } from "@ncl/lib/utils/verify-tokens-and-permissions";
import { firestore } from "@ncl/lib/firebase-admin-config";
import { processImage } from "@ncl/lib/utils/process-image";
import { getFieldsProperty } from "@ncl/lib/utils/get-fields-property";
import { ImageData } from "@ncl/app/shared/types";
import { sendErrorResponse } from "@ncl/lib/utils/send-error-response";
import { PrepareDocument } from "@ncl/app/shared/models";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface ImageUploadResult {
  key: string;
  value: ImageData;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const hasPermissions = await verifyTokensAndPermissions(req, res, {
    admin: true,
    preparer: true,
  });
  if (!hasPermissions) return;

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return sendErrorResponse(res, 500, "form-error", "Form process error");
    }

    try {
      const { preparerID, ...convertedFields } = getFieldsProperty(fields);

      const processFile = async (
        key: string,
        file?: formidable.File | formidable.File[],
      ) => {
        if (Array.isArray(file)) {
          file = file[0];
        }

        if (file && file.filepath) {
          const processedImage = await processImage(
            file,
            "prepare-documents",
            preparerID || "unknown",
          );

          return { key: key.replace(/File$/, "Image"), value: processedImage };
        }
        return null;
      };

      const uploadPromises = Object.entries(files).map(([key, file]) =>
        processFile(key, file),
      );

      const imageUrls: ImageUploadResult[] = (
        await Promise.all(uploadPromises)
      ).filter((result): result is ImageUploadResult => result !== null);

      const docData: Partial<PrepareDocument> = {
        ...convertedFields,
        createdAt: new Date(),
        ...Object.fromEntries(imageUrls.map(({ key, value }) => [key, value])),
      };

      const docRef = firestore.collection("prepare-documents").doc();

      await docRef.set({ ...docData, id: docRef.id });

      res.status(201).json({ ...docData, id: docRef.id });
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
  });
}
