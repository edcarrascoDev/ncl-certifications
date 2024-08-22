import { NextApiResponse } from "next";

export const sendErrorResponse = (
  res: NextApiResponse,
  statusCode: number,
  code: string,
  message: string,
) => {
  res.status(statusCode).json({ code, message });
};
