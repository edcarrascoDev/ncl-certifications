"use client";
import TextField from "@ncl/app/components/shared/text-field";
import { ChangeEvent } from "react";
import { fetchRequest, getFirebaseCodeMessage, ROUTES } from "@ncl/app/shared";
import { PrepareDocument } from "@ncl/app/shared/models";
import { useUser } from "@ncl/app/context/user-context";
import { useUi } from "@ncl/app/context/ui-context";
import Button from "@ncl/app/components/shared/button";
import { useRouter } from "next/navigation";
import { usePrepareDocument } from "@ncl/app/context/prepare-document-context";
import { RoleEnum } from "@ncl/app/shared/enums";
import PrepareDocumentsList from "@ncl/app/components/dashboard/prepare-documents/prepare-documents-list";

export default function Page() {
  const { user } = useUser();
  const { documents, setDocuments } = usePrepareDocument();
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

  return (
    <div className="mt-4">
      {(user?.role === RoleEnum.admin || user?.role === RoleEnum.preparer) && (
        <div className="bg-picton-blue-50 p-4 mb-4 md:mb-8 rounded border border-picton-blue-100 flex flex-wrap justify-between gap-2">
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

      <PrepareDocumentsList documents={documents} route={ROUTES.CARS_PREPARE} />
    </div>
  );
}
