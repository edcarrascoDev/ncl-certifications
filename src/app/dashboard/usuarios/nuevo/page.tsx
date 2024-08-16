"use client";
import UserForm from "@ncl/app/dashboard/usuarios/components/user-form";
import { UserData } from "@ncl/app/shared/models";
import { fetchRequest } from "@ncl/app/shared";
import { ROUTES } from "@ncl/app/shared/constants/routes";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewUser() {
  const router = useRouter();
  const [error, setError] = useState<string | null>("");
  const handleSubmit = async (data: UserData) => {
    setError(null);
    const response = await fetchRequest("/api/users/create-user", {
      ...data,
      id: "",
    });

    if (response?.success) {
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
