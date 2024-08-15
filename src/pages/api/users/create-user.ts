import type { NextApiRequest, NextApiResponse } from "next";
import { RoleEnum } from "@ncl/app/shared/enums";
import { UserData } from "@ncl/app/shared/models";
import { auth, firestore } from "../../../../firebase-admin";
import { verifyTokensAndPermissions } from "@ncl/pages/utils/verify-tokens-and-permissions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const hasPermissions = await verifyTokensAndPermissions(req, res, {
      admin: true,
    });
    if (!hasPermissions) return;

    const {
      email,
      password,
      name,
      lastName,
      role,
      phone,
      companyName,
      companyId,
    } = req.body;

    try {
      const userRecord = await auth.createUser({
        email,
        password,
        displayName: `${name} ${lastName}`,
      });

      await auth.setCustomUserClaims(userRecord.uid, {
        admin: role === RoleEnum.admin,
        preparer: role === RoleEnum.preparer,
        director: role === RoleEnum.director,
      });

      console.log(`User ${name} was created with role ${role}`);

      const userData: UserData = {
        id: userRecord.uid,
        email,
        name,
        lastName,
        phone,
        role,
        companyName,
        companyId,
        createdAt: new Date(),
      };

      await firestore.collection("users").doc(userRecord.uid).set(userData);

      res.status(201).json({ userId: userRecord.uid });
    } catch (error) {
      console.log({ error });
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
