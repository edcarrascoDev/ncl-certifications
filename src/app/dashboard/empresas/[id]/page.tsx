"use client";
import CompanyForm from "@ncl/app/dashboard/empresas/components/company-form";
import { useEffect, useState } from "react";
import {
  getCompanyById,
  updateCompany,
} from "@ncl/app/lib/firebase/firestore/company";
import { CompanyData } from "@ncl/app/shared/models/company.data";
import { useRouter } from "next/navigation";
import { useCompany } from "@ncl/app/context/company-context";
import { useUi } from "@ncl/app/context/ui-context";
import { getFirebaseCodeMessage } from "@ncl/app/shared";
import Button from "@ncl/app/components/shared/button";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { loading, setLoading, setSnackbarData } = useUi();
  const { currentCompany, setCurrentCompany, setCompanies } = useCompany();
  const [error, setError] = useState<string | null>("");
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

  const handleSubmit = async (data: CompanyData) => {
    setLoading(true);
    if (currentCompany) {
      const response = await updateCompany(currentCompany?.id as string, data);
      setLoading(false);
      if (response.success) {
        setCompanies((prevCompanies) =>
          prevCompanies.map((item) =>
            item.id === currentCompany.id ? { ...item, ...data } : item,
          ),
        );
        setSnackbarData({
          open: true,
          message: "La empresa ha sido actualizada satisfactoriamente",
          messageType: "success",
        });
      } else {
        setError(response.error);
      }
    }
  };
  return (
    <>
      <Button
        onClick={() => router.back()}
        color="light"
        startIcon="arrow_back"
        className="my-4"
      >
        Volver
      </Button>
      <CompanyForm
        companyData={currentCompany as CompanyData}
        buttonChildren={"Actualizar empresa"}
        error={error}
        handleSubmit={handleSubmit}
        dataLoading={loading}
      />
    </>
  );
}
