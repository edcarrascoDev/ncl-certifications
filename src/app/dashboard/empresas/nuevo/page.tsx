"use client";
import CompanyForm from "@ncl/app/dashboard/empresas/components/company-form";
import { useState } from "react";
import { createCompany } from "@ncl/app/lib/firebase/firestore/company";
import { ROUTES } from "@ncl/app/shared/constants/routes";
import { CompanyData } from "@ncl/app/shared/models/company.data";
import { useRouter } from "next/navigation";
import { useUi } from "@ncl/app/context/ui-context";
import { useCompany } from "@ncl/app/context/company-context";

export default function NewCompany() {
  const router = useRouter();
  const { setSnackbarData, setLoading } = useUi();
  const { setCompanies } = useCompany();
  const [error, setError] = useState<string | null>("");

  const handleSubmit = async (data: CompanyData) => {
    setLoading(true);
    setError(null);
    const response = await createCompany(data);
    setLoading(false);
    if (response.success) {
      setCompanies([]);
      setSnackbarData({
        open: true,
        message: "La empresa ha sido actualizada satisfactoriamente",
        messageType: "success",
      });
      router.push(ROUTES.COMPANIES);
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
    </>
  );
}
