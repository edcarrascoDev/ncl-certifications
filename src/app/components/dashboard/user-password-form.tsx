import { UserData } from "@ncl/app/shared/models";
import TextField from "@ncl/app/components/shared/text-field";
import { useFormik } from "formik";
import Button from "@ncl/app/components/shared/button";
import { passwordValidator } from "@ncl/app/shared/validators/password-validator";
import { fetchRequest, getFirebaseCodeMessage } from "@ncl/app/shared";
import { useState } from "react";
import ErrorText from "@ncl/app/components/shared/error-text";
import SuccessText from "@ncl/app/components/shared/success-text";
import { signOut } from "@ncl/app/lib/firebase/auth";
import { removeSession } from "@ncl/app/actions/auth-actions";

export default function UserPassword({ user }: { user: UserData }) {
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordValidator,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting }) => {
      setError(null);
      setIsSuccess(false);
      setSubmitting(true);
      const response = await fetchRequest("/api/users/update-password", {
        password: values.password,
      });
      setSubmitting(false);

      if (response.success) {
        setIsSuccess(true);
        setTimeout(async () => {
          await signOut();
          await removeSession();
        }, 6000);
      } else {
        setIsSuccess(false);
        setError(response.error);
      }
    },
  });
  return (
    <div className="w-full rounded bg-gray-50 p-4 md:px-8 border">
      <h3 className="text-xl font-semibold my-2">Cambiar contraseña</h3>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          labelName={"Contraseña"}
          id={"password"}
          name={"password"}
          type={"password"}
          formik={formik}
        />
        <TextField
          labelName={"Confirmar Contraseña"}
          id={"confirmPassword"}
          name={"confirmPassword"}
          type={"password"}
          formik={formik}
        />
        <Button disabled={formik.isSubmitting} type={"submit"}>
          Actualizar
        </Button>
      </form>
      {error && <ErrorText>{getFirebaseCodeMessage(error)}</ErrorText>}
      {isSuccess && (
        <SuccessText>
          La contraseña se actualizó correctamente, pro favor ingrese nuevamente
          con su nueva contraseña
        </SuccessText>
      )}
    </div>
  );
}
