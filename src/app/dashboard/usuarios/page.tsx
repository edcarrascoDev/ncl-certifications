"use client";
import Button from "@ncl/app/components/shared/button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@ncl/app/shared/constants/routes";
import Table, { TableColumn } from "@ncl/app/components/shared/table";
import { UserData } from "@ncl/app/shared/models";
import { useEffect, useState } from "react";
import { getAllUsers } from "@ncl/app/lib/firebase/firestore/user";
import { fetchRequest, USER_ROLES } from "@ncl/app/shared";
import { Icon } from "@mui/material";
import ConfirmationDialog from "@ncl/app/components/shared/confirmation-dialog";
import TableHeader from "@ncl/app/components/shared/table-header";

export default function Users() {
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (response.success) {
        setUsers(response.result as UserData[]);
      }
    };
    fetchUsers();
  }, []);

  const handleRemove = async (value: boolean) => {
    setOpenConfirmation(false);
    if (value) {
      setIsLoading(true);
      const response = await fetchRequest(
        "/api/users/remove-user",
        { uid: selectedUser?.id },
        "DELETE",
      );

      setSelectedUser(null);
      setIsLoading(false);
      if (response?.success) {
        setUsers(users.filter((item) => item.id !== selectedUser?.id));
      }
    } else {
      setTimeout(() => setSelectedUser(null), 500);
    }
  };

  const columns: TableColumn<UserData>[] = [
    {
      field: "fullName",
      headerName: "Nombre completo",
      valueGetter: (item) => `${item.name} ${item.lastName}`,
    },
    {
      field: "email",
      headerName: "Correo electrónico",
    },
    {
      field: "companyName",
      headerName: "Empresa",
    },
    {
      field: "role",
      headerName: "Rol",
      valueGetter: (item) =>
        USER_ROLES.find((userRol) => userRol.role === item.role)?.name,
    },
    {
      field: "edit",
      headerName: "Editar/Eliminar",
      valueGetter: (item) => (
        <div className={"flex gap-2"}>
          <Button
            onClick={() => router.push(`${ROUTES.USERS}/${item.id}`)}
            size={"small"}
            disabled={isLoading}
          >
            <Icon sx={{ fontSize: 16 }}>edit</Icon>
          </Button>
          <Button
            onClick={() => {
              setOpenConfirmation(true);
              setSelectedUser(item);
            }}
            color={"error"}
            size={"small"}
            disabled={isLoading}
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
        title={"Lista de usuarios"}
        actionChildren={
          <Button onClick={() => router.push(ROUTES.NEW_USER)}>
            Agregar usuario
          </Button>
        }
      />
      <Table columns={columns} rows={users} />
      <ConfirmationDialog
        open={openConfirmation}
        title={`¿Está seguro de eliminar a ${selectedUser?.name} ${selectedUser?.lastName}?`}
        message={"Una vez realizada esta acción no podrá revertirla"}
        handleClose={(value) => handleRemove(value)}
      />
    </>
  );
}
