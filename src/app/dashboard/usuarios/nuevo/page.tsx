"use client";
import UserForm from "@ncl/app/dashboard/usuarios/components/user-form";
import { UserData } from "@ncl/app/shared/models";
import { fetchRequest } from "@ncl/app/shared";
import { ROUTES } from "@ncl/app/shared/constants/routes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUi } from "@ncl/app/context/ui-context";
import { useUser } from "@ncl/app/context/user-context";

export default function NewUser() {
  const router = useRouter();
  const { setUsers } = useUser();
  const { setSnackbarData, setLoading } = useUi();
  const [error, setError] = useState<string | null>("");
  const handleSubmit = async (data: UserData) => {
    setLoading(true);
    setError(null);
    const response = await fetchRequest("/api/users/create-user", {
      ...data,
      id: "",
    });
    setLoading(false);
    if (response?.success) {
      setUsers([]);
      setSnackbarData({
        open: true,
        message: "El Usuario ha sido creado satisfactoriamente",
        messageType: "success",
      });
      router.push(ROUTES.USERS);
    } else {
      setError(response?.error);
    }
  };
  return (
    <UserForm
      buttonChildren={"Crear usuario"}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
}
