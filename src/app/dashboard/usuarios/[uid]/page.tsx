"use client";
import { useEffect, useState } from "react";
import UserForm from "@ncl/app/dashboard/usuarios/components/user-form";
import { fetchRequest } from "@ncl/app/shared";
import { UserData } from "@ncl/app/shared/models";
import { getUserById } from "@ncl/app/lib/firebase/firestore/user";
import BackdropLoading from "@ncl/app/components/shared/backdrop-loading";
import SnackbarResponse from "@ncl/app/components/shared/snackbar-response";

export default function Page({ params }: { params: { uid: string } }) {
  const [error, setError] = useState<string | null>("");
  const [errorData, setErrorData] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const response = await getUserById(params.uid);

      setIsLoading(false);
      if (response.success) {
        setUserData(response.result as UserData);
      } else {
        setErrorData(response.error);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (data: UserData) => {
    setError(null);
    setIsSuccess(true);
    setIsLoading(true);
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
    setIsLoading(false);

    if (response?.success) {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 6000);
    } else {
      setError(response?.error);
    }
  };
  return (
    <>
      <UserForm
        userData={userData}
        dataLoading={isLoading}
        buttonChildren={"Actualizar usuario"}
        handleSubmit={handleSubmit}
        error={error}
      />
      <BackdropLoading open={isLoading} />
      <SnackbarResponse
        open={isSuccess || Boolean(errorData)}
        message={
          isSuccess
            ? "El usuario ha sido actualizado satisfactoriamente"
            : errorData
        }
        messageType={isSuccess ? "success" : "error"}
      />
    </>
  );
}
