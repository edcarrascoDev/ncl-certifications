import type { NextApiRequest, NextApiResponse } from "next";
import { RoleEnum } from "@ncl/app/shared/enums";
import { UserData } from "@ncl/app/shared/models";
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
    const { email, name, lastName, role } = req.body;

    try {
      let uid;
      if (hasPermissions) {
        uid = req.body.id;
      } else {
        const decodedToken = await auth.verifyIdToken(token);
        uid = decodedToken.uid;
      }
      if (!uid) {
        res.status(401).json({
          code: "auth/unauthorized-user",
          message: "User ID is missing",
        });
      }

      if (email || name || lastName) {
        await auth.updateUser(uid, {
          email,
          displayName: `${name} ${lastName}`,
        });
        console.log(`User ${uid} was updated on Auth`);
      }

      if (role) {
        await auth.setCustomUserClaims(uid, {
          admin: role === RoleEnum.admin,
          preparer: role === RoleEnum.preparer,
          director: role === RoleEnum.director,
        });
        console.log(`User Role updated with role ${role}`);
      }

      const docRef = firestore.collection("users").doc(uid);

      const { id, ...dataToUpdate } = req.body;

      await docRef.update({
        ...dataToUpdate,
        updatedAt: new Date(),
      });
      console.log(`User ${id} was updated in firestore`);

      res.status(201).json({ userId: uid });
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
