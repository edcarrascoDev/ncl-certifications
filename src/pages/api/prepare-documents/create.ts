import formidable, { IncomingForm } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyTokensAndPermissions } from "@ncl/lib/utils/verify-tokens-and-permissions";
import { firestore } from "@ncl/lib/firebase-admin-config";
import { processImage } from "@ncl/lib/utils/process-image";
import { getFieldsProperty } from "@ncl/lib/utils/get-fields-property";
import { ImageData } from "@ncl/app/shared/types";

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
  if (req.method === "POST") {
    // Verificar permisos antes de parsear el formulario
    const hasPermissions = await verifyTokensAndPermissions(req, res, {
      admin: true,
      preparer: true,
    });
    if (!hasPermissions) return;

    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: "Form process error" });
        return;
      }

      try {
        const { preparerID, ...convertedFields } = getFieldsProperty(fields);

        const uploadPromises = ["licenseTransitFile", "SOATFile"].map(
          async (key) => {
            let file = files[key] as formidable.File | formidable.File[];

            if (Array.isArray(file)) {
              file = file[0];
            }

            if (file && file.filepath) {
              const processedImage = await processImage(
                file,
                "prepare-documents",
                preparerID || "unknown",
              );

              return { key, value: processedImage };
            }
            return null;
          },
        );

        const imageUrls: ImageUploadResult[] = (
          await Promise.all(uploadPromises)
        ).filter((result): result is ImageUploadResult => result !== null);

        const docData = {
          ...convertedFields,
          ...Object.fromEntries(
            imageUrls.map(({ key, value }) => [key, value]),
          ),
        };

        await firestore.collection("prepare-documents").doc().set(docData);
        res.status(201).json(docData);
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
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
