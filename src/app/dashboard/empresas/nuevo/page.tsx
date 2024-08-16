"use client";
import CompanyForm from "@ncl/app/dashboard/empresas/components/company-form";
import { useState } from "react";
import { createCompany } from "@ncl/app/lib/firebase/firestore/company";
import { ROUTES } from "@ncl/app/shared/constants/routes";
import { CompanyData } from "@ncl/app/shared/models/company.data";
import { useRouter } from "next/navigation";
import SnackbarResponse from "@ncl/app/components/shared/snackbar-response";

export default function NewCompany() {
  const [error, setError] = useState<string | null>("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: CompanyData) => {
    setError(null);
    const response = await createCompany(data);

    if (response.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        router.push(ROUTES.COMPANIES);
      }, 4000);
    } else {
      setError(response?.error);
    }
  };
  return (
    <>
      <CompanyForm
        buttonChildren={"Crear empresa"}
        handleSubmit={handleSubmit}
        error={error}
      />
      <SnackbarResponse
        open={isSuccess}
        message={"La empresa ha sido actualizada satisfactoriamente"}
        messageType={"success"}
      />
    </>
  );
}
