"use client";
import TextField from "@ncl/app/components/shared/text-field";
import { ChangeEvent } from "react";
import { fetchRequest, getFirebaseCodeMessage, ROUTES } from "@ncl/app/shared";
import { PrepareDocument } from "@ncl/app/shared/models";
import { useUser } from "@ncl/app/context/user-context";
import { useUi } from "@ncl/app/context/ui-context";
import Table, { TableColumn } from "@ncl/app/components/shared/table";
import Button from "@ncl/app/components/shared/button";
import { useRouter } from "next/navigation";
import moment from "moment";
import { usePrepareDocument } from "@ncl/app/context/prepare-document-context";
import ErrorText from "@ncl/app/components/shared/error-text";
import { RoleEnum } from "@ncl/app/shared/enums";

export default function Page() {
  const { user } = useUser();
  const { documents, setDocuments, setDocument } = usePrepareDocument();
  const router = useRouter();
  const { setLoading, setSnackbarData } = useUi();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length > 5) {
      setLoading(true);
      setDocuments(null);
      fetchRequest<PrepareDocument[]>(
        "/api/prepare-documents/get-documents-by-license-plate",
        { companyId: user?.companyId, licensePlate: value.toUpperCase() },
      )
        .then((response) => {
          if (response?.success) {
            setDocuments(response.result as PrepareDocument[]);
          } else {
            console.error(response.error);
            setSnackbarData({
              open: true,
              message: getFirebaseCodeMessage(response?.error),
              messageType: "error",
            });
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  };

  const handleClick = (item: PrepareDocument) => {
    setDocument(item);
    router.push(`${ROUTES.CARS_PREPARE}/${item.id}`);
  };

  const columns: TableColumn<PrepareDocument>[] = [
    {
      field: "fullName",
      headerName: "Realizador",
      valueGetter: (item) => item.preparerName,
    },
    {
      field: "licensePlate",
      headerName: "Placa",
    },
    {
      field: "internalNumber",
      headerName: "Número de licencia",
    },
    {
      field: "date",
      headerName: "Fecha de creación",
      valueGetter: (item) => moment(item.createdAt).format("DD/MM/YYYY"),
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
    <div className="mt-4">
      {(user?.role === RoleEnum.admin || user?.role === RoleEnum.preparer) && (
        <div className="bg-picton-blue-50 p-4 mb-4 md:mb-8 rounded border border-picton-blue-100 flex justify-between gap-2">
          <h2 className="text-lg font-semibold text-primary">
            Genera aquí un nuevo documento.
          </h2>
          <Button onClick={() => router.push(ROUTES.NEW_CAR_PREPARE)}>
            Ir al formulario
          </Button>
        </div>
      )}

      <div className="px-2 py-4 rounded border max-w-lg mx-auto bg-gray-50">
        <h2 className="text-xl font-semibold text-center py-4 mb-6">
          Consulte resultado del formulario de alistamiento de vehículo por
          placa
        </h2>
        <div className="max-w-48 mx-auto">
          <TextField
            groupClassname={"text-field--input-white"}
            labelName={""}
            placeholder={"Digite la placa"}
            id={"licensePlate"}
            name={"licensePlate"}
            onChange={handleChange}
            inputProps={{ maxLength: 6 }}
            style={{ textTransform: "uppercase" }}
          />
        </div>
      </div>

      {documents &&
        (documents.length > 0 ? (
          <Table columns={columns} rows={documents} />
        ) : (
          <ErrorText>
            No se encontró Ningún document con la placa digitada, o no tiene
            permisos a este.
          </ErrorText>
        ))}
    </div>
  );
}
