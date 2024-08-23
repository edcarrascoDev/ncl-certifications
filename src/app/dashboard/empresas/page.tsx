"use client";
import Table, { TableColumn } from "@ncl/app/components/shared/table";
import { CompanyData } from "@ncl/app/shared/models/company.data";
import Button from "@ncl/app/components/shared/button";
import { ROUTES } from "@ncl/app/shared/constants/routes";
import { Icon } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getAllCompanies,
  removeCompany,
} from "@ncl/app/lib/firebase/firestore/company";
import ConfirmationDialog from "@ncl/app/components/shared/confirmation-dialog";
import TableHeader from "@ncl/app/components/shared/table-header";
import { useCompany } from "@ncl/app/context/company-context";
import { useUi } from "@ncl/app/context/ui-context";

export default function Companies() {
  const router = useRouter();
  const { loading, setLoading } = useUi();
  const { companies, setCompanies, setCurrentCompany } = useCompany();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(
    null,
  );

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await getAllCompanies();
      if (response.success) {
        setCompanies(response.result as CompanyData[]);
      }
    };
    if (companies.length === 0) {
      fetchCompanies();
    }
  }, []);

  const handleRemove = async (value: boolean) => {
    setOpenConfirmation(false);
    if (value && selectedCompany?.id) {
      setLoading(true);
      const response = await removeCompany(selectedCompany.id);
      setSelectedCompany(null);
      setLoading(false);
      if (response.success) {
        setCompanies(
          companies.filter((item) => item.id !== selectedCompany.id),
        );
      }
    }
  };

  const columns: TableColumn<CompanyData>[] = [
    { field: "name", headerName: "Empresa" },
    {
      field: "documentId",
      headerName: "NIT/RUT",
      textNoWrap: true,
      valueGetter: (item) => `${item.documentIdType} ${item.documentId}`,
    },
    { field: "email", headerName: "Correo Electrónico" },
    {
      field: "edit",
      headerName: "",
      valueGetter: (item) => (
        <div className={"flex gap-2"}>
          <Button
            onClick={() => {
              setCurrentCompany(item);
              router.push(`${ROUTES.COMPANIES}/${item.id}`);
            }}
            size={"small"}
            disabled={loading}
          >
            <Icon sx={{ fontSize: 16 }}>edit</Icon>
          </Button>
          <Button
            onClick={() => {
              setOpenConfirmation(true);
              setSelectedCompany(item);
            }}
            color={"error"}
            size={"small"}
            disabled={loading}
          >
            <Icon sx={{ fontSize: 16 }}>delete</Icon>
          </Button>
        </div>
      ),
    },
  ];
  return (
    <>
      <TableHeader
        title={"Lista de empresas"}
        actionChildren={
          <Button onClick={() => router.push(ROUTES.NEW_COMPANY)}>
            Agregar empresa
          </Button>
        }
      />
      <Table columns={columns} rows={companies} />
      <ConfirmationDialog
        open={openConfirmation}
        title={`¿Está seguro de eliminar la empresa ${selectedCompany?.name} ?`}
        message={"Una vez realizada esta acción no podrá revertirla"}
        handleClose={(value) => handleRemove(value)}
      />
    </>
  );
}
