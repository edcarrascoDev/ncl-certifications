"use client";
import CompanyForm from "@ncl/app/dashboard/empresas/components/company-form";
import { useEffect, useState } from "react";
import {
  getCompanyById,
  updateCompany,
} from "@ncl/app/lib/firebase/firestore/company";
import { CompanyData } from "@ncl/app/shared/models/company.data";
import BackdropLoading from "@ncl/app/components/shared/backdrop-loading";
import SnackbarResponse from "@ncl/app/components/shared/snackbar-response";

export default function Page({ params }: { params: { id: string } }) {
  const [error, setError] = useState<string | null>("");
  const [errorData, setErrorData] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyData>();
  useEffect(() => {
    const fetchCompany = async () => {
      const response = await getCompanyById(params.id);
      setIsLoading(false);
      if (response.success) {
        setCompanyData(response.result as CompanyData);
      } else {
        setErrorData(response.error);
      }
    };
    fetchCompany();
  }, []);

  const handleSubmit = async (data: CompanyData) => {
    setIsSuccess(false);
    if (companyData) {
      const response = await updateCompany(companyData?.id, data);

      if (response.success) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 6000);
      } else {
        setError(response.error);
      }
    }
  };
  return (
    <>
      <CompanyForm
        companyData={companyData}
        buttonChildren={"Actualizar empresa"}
        error={error}
        handleSubmit={handleSubmit}
        dataLoading={isLoading}
      />
      <BackdropLoading open={isLoading} />
      <SnackbarResponse
        open={isSuccess || Boolean(errorData)}
        message={
          isSuccess
            ? "La empresa ha sido actualizada satisfactoriamente"
            : errorData
        }
        messageType={isSuccess ? "success" : "error"}
      />
    </>
  );
}
