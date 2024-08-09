"use client";
import TextField from "@ncl/app/components/shared/text-field";
import SelectField from "@ncl/app/components/shared/select-field";
import {
  FORM_ERROR_MESSAGE,
  getFirebaseCodeMessage,
  USER_ROLES,
} from "@ncl/app/shared";
import Button from "@ncl/app/components/shared/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "@ncl/app/lib/firebase/auth";
import { RoleEnum, StatusResponseEnum } from "@ncl/app/shared/enums";
import { useState } from "react";
import ErrorText from "@ncl/app/components/shared/error-text";
import { useRouter } from "next/navigation";
import { ROUTES } from "@ncl/app/shared/constants/routes";

export default function NewUser() {
  const router = useRouter();
  const [error, setError] = useState<string | null>("");
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    lastName: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    phone: Yup.string()
      .matches(/^\d{10}$/, FORM_ERROR_MESSAGE.PHONE_INVALID)
      .required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    email: Yup.string()
      .email(FORM_ERROR_MESSAGE.EMAIL_INVALID)
      .required(FORM_ERROR_MESSAGE.EMAIL_REQUIRED),
    password: Yup.string()
      .min(8, FORM_ERROR_MESSAGE.PASSWORD_MIN)
      .required(FORM_ERROR_MESSAGE.PASSWORD_REQUIRED),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], FORM_ERROR_MESSAGE.PASSWORD_DIFFERENT)
      .required(FORM_ERROR_MESSAGE.PASSWORD_REQUIRED),
    companyId: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    role: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyId: "",
      companyName: "",
      role: RoleEnum.admin,
    },
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setError(null);
      const response = await createUserWithEmailAndPassword({
        id: "",
        ...values,
      });

      if (response?.status === StatusResponseEnum.success) {
        router.push(ROUTES.USERS);
      } else {
        setError(response?.error);
      }
    },
  });
  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid md:grid-cols-2 gap-x-4 mb-6">
          <TextField
            labelName={"Nombre(s)"}
            id={"name"}
            name={"name"}
            formik={formik}
          />
          <TextField
            labelName={"Apellidos"}
            id={"lastName"}
            name={"lastName"}
            formik={formik}
          />
          <TextField
            labelName={"Teléfono"}
            id={"phone"}
            name={"phone"}
            formik={formik}
          />
          <TextField
            labelName={"Correo electrónico"}
            id={"email"}
            name={"email"}
            formik={formik}
          />
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
          <SelectField
            label={"Empresa"}
            options={[{ children: "empresa de prueba", value: "test" }]}
            id={"companyId"}
            name={"companyId"}
            formik={formik}
          />
          <SelectField
            label={"Rol"}
            options={USER_ROLES.map((item) => ({
              children: item.name,
              value: item.role,
            }))}
            id={"role"}
            name={"role"}
            formik={formik}
          />
        </div>
        <Button type={"submit"} disabled={formik.isSubmitting}>
          Crear usuario
        </Button>
        {error && <ErrorText>{getFirebaseCodeMessage(error)}</ErrorText>}
      </form>
    </div>
  );
}
