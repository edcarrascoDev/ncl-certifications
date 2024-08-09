import { useFormik } from "formik";
import TextField from "@ncl/app/components/shared/text-field";
import Button from "@ncl/app/components/shared/button";
import * as Yup from "yup";
import { FORM_ERROR_MESSAGE, getFirebaseCodeMessage } from "@ncl/app/shared";
import ErrorText from "@ncl/app/components/shared/error-text";
import { useState } from "react";
import { signInWithEmailAndPassword } from "@ncl/app/lib/firebase/auth";
import { createSession } from "@ncl/app/actions/auth-actions";
import { StatusResponseEnum } from "@ncl/app/shared/enums";

export default function LoginForm() {
  const [error, setError] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(FORM_ERROR_MESSAGE.EMAIL_INVALID)
      .required(FORM_ERROR_MESSAGE.EMAIL_REQUIRED),
    password: Yup.string().required(FORM_ERROR_MESSAGE.PASSWORD_REQUIRED),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: async ({ email, password }) => {
      const response = await signInWithEmailAndPassword({ email, password });

      if (response.status === StatusResponseEnum.success) {
        await createSession(response.result as string);
      } else {
        setError(response?.error);
      }
    },
  });

  return (
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      <div>
        <TextField
          labelName={"Correo electrónico"}
          id={"email"}
          name={"email"}
          type={"email"}
          formik={formik}
        />
        <TextField
          labelName={"Contraseña"}
          id={"password"}
          name={"password"}
          type={"password"}
          formik={formik}
        />
      </div>
      <div>
        <Button type="submit" disabled={formik.isSubmitting} fullwidth>
          Iniciar sesión
        </Button>
      </div>
      {error && <ErrorText>{getFirebaseCodeMessage(error)}</ErrorText>}
    </form>
  );
}
