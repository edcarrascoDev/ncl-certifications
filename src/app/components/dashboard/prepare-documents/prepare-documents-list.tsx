import { PrepareDocument } from "@ncl/app/shared/models";
import Table, { TableColumn } from "@ncl/app/components/shared/table";
import Button from "@ncl/app/components/shared/button";
import { getFormattedDate } from "@ncl/app/shared";
import { useRouter } from "next/navigation";
import { usePrepareDocument } from "@ncl/app/context/prepare-document-context";

export default function PrepareDocumentsList({
  documents,
  route,
}: {
  documents: PrepareDocument[] | null;
  route: string;
}) {
  const router = useRouter();
  const { setDocument } = usePrepareDocument();

  const handleClick = (item: PrepareDocument) => {
    setDocument(item);
    router.push(`${route}/${item.id}`);
  };

  const columns: TableColumn<PrepareDocument>[] = [
    {
      field: "fullName",
      headerName: "Realizador",
      valueGetter: (item) => item.preparerName,
    },
    {
      field: "licensePlate",
      headerName: "Placa del vehículo",
    },
    {
      field: "internalNumber",
      headerName: "Número interno",
    },
    {
      field: "date",
      headerName: "Fecha de creación",
      valueGetter: (item) => getFormattedDate(item?.createdAt),
    },
    {
      field: "watch",
      headerName: "documento",
      valueGetter: (item) => (
        <div className={"flex gap-2"}>
          <Button onClick={() => handleClick(item)} size={"small"}>
            Ver documento
          </Button>
        </div>
      ),
    },
  ];

  return (
    documents &&
    (documents.length > 0 ? (
      <Table columns={columns} rows={documents} />
    ) : (
      <div className={"p-2 bg-gray-50 text-lg"}>
        No se encontró Ningún document con los parámetros establecidos.
      </div>
    ))
  );
}
