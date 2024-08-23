"use client";
import { useEffect, useState } from "react";
import UserForm from "@ncl/app/dashboard/usuarios/components/user-form";
import { fetchRequest, getFirebaseCodeMessage } from "@ncl/app/shared";
import { UserData } from "@ncl/app/shared/models";
import { getUserById } from "@ncl/app/lib/firebase/firestore/user";
import { useUser } from "@ncl/app/context/user-context";
import { useUi } from "@ncl/app/context/ui-context";
import Button from "@ncl/app/components/shared/button";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { uid: string } }) {
  const router = useRouter();
  const { currentUser, setCurrentUser, setUsers } = useUser();
  const { loading, setLoading, setSnackbarData } = useUi();
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await getUserById(params.uid);

      setLoading(false);
      if (response.success) {
        setCurrentUser(response.result as UserData);
      } else {
        setSnackbarData({
          open: true,
          message: getFirebaseCodeMessage(response.error),
          messageType: "error",
        });
      }
    };
    if (!currentUser || currentUser.id !== params.uid) {
      fetchUser();
    }
  }, []);

  const handleSubmit = async (data: UserData) => {
    setError(null);
    setLoading(true);
    const dataToUpdate: Partial<UserData> = {};

    (Object.keys(data) as (keyof UserData)[]).forEach((key) => {
      if (
        key !== "createdAt" &&
        key !== "updatedAt" &&
        key !== "role" &&
        currentUser &&
        data[key] !== currentUser[key]
      ) {
        dataToUpdate[key] = data[key];
      }
    });
    if (data.role !== currentUser?.role) dataToUpdate["role"] = data?.role;

    delete dataToUpdate["password"];

    const response = await fetchRequest("/api/users/update-user", {
      ...dataToUpdate,
      id: currentUser?.id,
    });
    setLoading(false);

    if (response?.success) {
      setUsers((prevUsers) =>
        prevUsers.map((item) =>
          item.id === currentUser?.id ? { ...item, ...dataToUpdate } : item,
        ),
      );
      setSnackbarData({
        open: true,
        message: "El usuario ha sido actualizado satisfactoriamente",
        messageType: "success",
      });
    } else {
      setError(response?.error);
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
      <UserForm
        userData={currentUser as UserData}
        dataLoading={loading}
        buttonChildren={"Actualizar usuario"}
        handleSubmit={handleSubmit}
        error={error}
      />
    </>
  );
}
