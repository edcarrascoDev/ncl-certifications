import fs from "fs";
import { storage } from "@ncl/lib/firebase-admin-config";
import sharp from "sharp";
import formidable from "formidable";
import { ImageData } from "@ncl/app/shared/types";

export const processImage = async (
  file: formidable.File,
  collection: string,
  ownerID: string,
): Promise<ImageData> => {
  console.log(`processing image ${file.originalFilename}`);
  const bucket = storage.bucket();
  const validFileName =
    file.originalFilename?.replace(/[^a-zA-Z0-9.-]/g, "_") || "unknown.jpg";
  const fileUpload = bucket.file(
    `images/${collection}/${ownerID}/${validFileName}`,
  );

  const fileBuffer = fs.readFileSync(file.filepath);

  const optimizedBuffer = await sharp(fileBuffer)
    .resize(800)
    .jpeg({ quality: 70 })
    .toBuffer();

  await fileUpload.save(optimizedBuffer, {
    metadata: {
      contentType: "image/jpeg",
    },
  });

  const [url] = await fileUpload.getSignedUrl({
    action: "read",
    expires: "03-01-2500",
  });

  return { fileName: validFileName, url, uploadAt: new Date() };
};
