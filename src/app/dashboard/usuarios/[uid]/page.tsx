"use client";
import UserForm from "@ncl/app/dashboard/usuarios/components/user-form";
import { useEffect, useState } from "react";
import { fetchRequest } from "@ncl/app/shared";
import { UserData } from "@ncl/app/shared/models";
import { useRouter } from "next/navigation";
import { ROUTES } from "@ncl/app/shared/constants/routes";

export default function Page({ params }: { params: { uid: string } }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>();
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const response = await fetchRequest<UserData>(
        "/api/users/get-user-by-uid",
        { uid: params.uid },
      );

      setIsLoading(false);
      if (response.success) {
        setUserData(response.result as UserData);
      } else {
        router.push(ROUTES.DASHBOARD);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (data: UserData) => {
    setError(null);
    const dataToUpdate: Partial<UserData> = {};

    (Object.keys(data) as (keyof UserData)[]).forEach((key) => {
      if (
        key !== "createdAt" &&
        key !== "updatedAt" &&
        key !== "role" &&
        userData &&
        data[key] !== userData[key]
      ) {
        dataToUpdate[key] = data[key];
      }
    });
    if (data.role !== userData?.role) dataToUpdate["role"] = data?.role;

    delete dataToUpdate["password"];

    const response = await fetchRequest("/api/users/update-user", {
      ...dataToUpdate,
      id: userData?.id,
    });

    if (response?.success) {
      console.log(response);
    } else {
      setError(response?.error);
    }
  };
  return (
    <UserForm
      userData={userData}
      dataLoading={isLoading}
      buttonChildren={"Actualizar usuario"}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
}
