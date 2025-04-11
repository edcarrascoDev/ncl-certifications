"use client";
import { useRouter } from "next/navigation";
import { useUi } from "@ncl/app/context/ui-context";
import { useEffect } from "react";
import { useCompany } from "@ncl/app/context/company-context";
import { getCompanyById } from "@ncl/app/lib/firebase/firestore/company";
import { CompanyData, PrepareDocument } from "@ncl/app/shared/models";
import { fetchRequest, getFirebaseCodeMessage, ROUTES } from "@ncl/app/shared";
import DatePicker from "@ncl/app/components/shared/date-picker";
import { usePrepareDocument } from "@ncl/app/context/prepare-document-context";
import Button from "@ncl/app/components/shared/button";
import PrepareDocumentsList from "@ncl/app/components/dashboard/prepare-documents/prepare-documents-list";
import moment, { Moment } from "moment";
import { Chip } from "@mui/material";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { setLoading, setSnackbarData } = useUi();
  const { currentCompany, setCurrentCompany } = useCompany();
  const {
    documents,
    setDocuments,
    requestParams: { start, end },
    setRequestParams,
  } = usePrepareDocument();

  useEffect(() => {
    const fetchCompany = async () => {
      const response = await getCompanyById(params.id);
      setLoading(false);
      if (response.success) {
        setCurrentCompany(response.result as CompanyData);
      } else {
        setSnackbarData({
          open: true,
          message: getFirebaseCodeMessage(response.error),
          messageType: "error",
        });
      }
    };
    if (!currentCompany || currentCompany.id !== params.id) {
      fetchCompany();
    }
  }, []);

  const getPrepareDocuments = (startDate: Moment, endDate: Moment) => {
    if (startDate && endDate) {
      setLoading(true);

      fetchRequest<PrepareDocument[]>(
        "/api/prepare-documents/get-documents-company-by-date",
        { companyId: params?.id, start: startDate, end: endDate },
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

  const setStaticDate = (initial: Moment, final: Moment) => {
    setRequestParams((prevState) => ({
      ...prevState,
      start: initial,
      end: final,
    }));
    getPrepareDocuments(initial, final);
  };
  return (
    <>
      <div className="my-2">
        <Button
          onClick={() => router.back()}
          color="light"
          startIcon="arrow_back"
        >
          Volver
        </Button>
      </div>
      <h2 className={"text-lg font-semibold uppercase mb-4"}>
        {currentCompany?.name} - Alistamientos
      </h2>
      <div className="bg-gray-50 p-8">
        <div className="md:flex gap-4 items-end">
          <div className="md:flex gap-4 items-center">
            <DatePicker
              labelName={"Desde"}
              value={start}
              onChange={(date) =>
                setRequestParams((prev) => ({ ...prev, start: date }))
              }
            />
            <span className={"md:block hidden"}>-</span>
            <DatePicker
              labelName={"Hasta"}
              value={end}
              onChange={(date) =>
                setRequestParams((prev) => ({ ...prev, end: date }))
              }
            />
          </div>
          <Button
            className={"mb-4"}
            disabled={!start || !end}
            onClick={() => getPrepareDocuments(start as Moment, end as Moment)}
          >
            Consultar
          </Button>
        </div>
        <div className="flex gap-2">
          <Chip
            label="Hoy"
            onClick={() =>
              setStaticDate(moment().startOf("day"), moment().endOf("day"))
            }
          />
          <Chip
            label="Este mes"
            variant="outlined"
            onClick={() =>
              setStaticDate(moment().startOf("month"), moment().endOf("month"))
            }
          />
          <Chip
            label="Mes pasado"
            variant="outlined"
            onClick={() =>
              setStaticDate(
                moment().subtract(1, "month").startOf("month"),
                moment().subtract(1, "month").endOf("month"),
              )
            }
          />
        </div>
      </div>

      <div className={"mt-6"}>
        {documents && start && end && (
          <div className={"mb-2 text-sm text-gray-500"}>
            Mostrando resultados entre el {moment(start).format("DD/MM/YYYY")} y
            el {moment(end).format("DD/MM/YYYY")}:
          </div>
        )}
        <PrepareDocumentsList
          documents={documents}
          route={`${ROUTES.COMPANIES_REPORT}/${params.id}/documento`}
        />
      </div>
    </>
  );
}
