import { NextApiRequest, NextApiResponse } from "next";
import { sendErrorResponse } from "@ncl/lib/utils/send-error-response";
import {
  PrepareDocumentCSVItem,
  PrepareDocumentCSVRequest,
  prepareDocumentHeaderMap,
} from "@ncl/app/shared/models";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");

function convertToCSV(
  data: PrepareDocumentCSVItem[],
  filterDate: string,
): string {
  const keys = Object.keys(data[0]) as (keyof PrepareDocumentCSVItem)[];
  const headers = keys.map((key) => prepareDocumentHeaderMap[key]);

  const rows = data.map((row) =>
    keys
      .map((field) => `"${String(row[field]).replace(/"/g, '""')}"`)
      .join(","),
  );

  const headerLine = headers.join(",");
  const allLines = [
    `Fecha de generación:,${filterDate}`,
    "",
    headerLine,
    ...rows,
  ];

  return allLines.join("\r\n");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const data = req.body as PrepareDocumentCSVRequest;

    if (!data?.items || !data?.startDate || !data?.endDate) {
      return sendErrorResponse(
        res,
        400,
        "missing-data",
        "Faltan datos para generar el archivo.",
      );
    }

    const csv = convertToCSV(
      data.items,
      `${moment(data.startDate).format("D [de] MMMM [de] YYYY")} - ${moment(data.endDate).format("D [de] MMMM [de] YYYY")}`,
    );

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="alistamientos.csv"',
    );
    res.status(200).send(csv);
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
