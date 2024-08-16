import TextField from "@ncl/app/components/shared/text-field";
import SelectField from "@ncl/app/components/shared/select-field";
import {
  FORM_ERROR_MESSAGE,
  getFirebaseCodeMessage,
  USER_ROLES,
} from "@ncl/app/shared";
import Button from "@ncl/app/components/shared/button";
import ErrorText from "@ncl/app/components/shared/error-text";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { RoleEnum } from "@ncl/app/shared/enums";
import { getAllCompanies } from "@ncl/app/lib/firebase/firestore/company";
import { CompanyData } from "@ncl/app/shared/models/company.data";
import { UserData } from "@ncl/app/shared/models";

interface UserFormProps {
  userData?: UserData;
  dataLoading?: boolean;
  buttonChildren: React.ReactNode;
  handleSubmit: (data: UserData) => void;
  error: string | null;
}

export default function UserForm({
  userData,
  dataLoading,
  buttonChildren,
  handleSubmit,
  error,
}: UserFormProps) {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await getAllCompanies();
      setIsLoading(false);
      if (response.success) {
        setCompanies(response.result as CompanyData[]);
      }
    };
    fetchData();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    lastName: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    phone: Yup.string()
      .matches(/^\d{10}$/, FORM_ERROR_MESSAGE.PHONE_INVALID)
      .required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    email: Yup.string()
      .email(FORM_ERROR_MESSAGE.EMAIL_INVALID)
      .required(FORM_ERROR_MESSAGE.EMAIL_REQUIRED),
    password: userData
      ? Yup.string().min(8, FORM_ERROR_MESSAGE.PASSWORD_MIN).notRequired()
      : Yup.string()
          .min(8, FORM_ERROR_MESSAGE.PASSWORD_MIN)
          .required(FORM_ERROR_MESSAGE.PASSWORD_REQUIRED),
    confirmPassword: userData
      ? Yup.string().oneOf(
          [Yup.ref("password")],
          FORM_ERROR_MESSAGE.PASSWORD_DIFFERENT,
        )
      : Yup.string()
          .oneOf([Yup.ref("password")], FORM_ERROR_MESSAGE.PASSWORD_DIFFERENT)
          .required(FORM_ERROR_MESSAGE.PASSWORD_REQUIRED),
    companyId: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    role: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  });

  const formik = useFormik({
    initialValues: {
      name: userData?.name || "",
      lastName: userData?.lastName || "",
      phone: userData?.phone || "",
      email: userData?.email || "",
      password: "",
      confirmPassword: "",
      companyId: userData?.companyId || "",
      companyName: userData?.companyName || "",
      role: userData?.role || RoleEnum.admin,
    },
    validateOnChange: true,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { confirmPassword, ...valuesToSend } = values;
      handleSubmit({
        ...valuesToSend,
        id: "",
        companyName:
          companies.find((item) => item.id === values.companyId)?.name || "",
      });
    },
  });

  useEffect(() => {
    setIsFormDirty(
      JSON.stringify(formik.values) !== JSON.stringify(formik.initialValues),
    );
  }, [formik.values]);

  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid md:grid-cols-2 gap-x-4 mb-6">
          <TextField
            labelName={"Nombre(s)"}
            id={"name"}
            name={"name"}
            formik={formik}
            disabled={dataLoading}
          />
          <TextField
            labelName={"Apellidos"}
            id={"lastName"}
            name={"lastName"}
            formik={formik}
            disabled={dataLoading}
          />
          <TextField
            labelName={"Teléfono"}
            id={"phone"}
            name={"phone"}
            formik={formik}
            disabled={dataLoading}
          />
          <TextField
            labelName={"Correo electrónico"}
            id={"email"}
            name={"email"}
            formik={formik}
            disabled={dataLoading}
          />
          {!userData && (
            <>
              <TextField
                labelName={"Contraseña"}
                id={"password"}
                name={"password"}
                type={"password"}
                formik={formik}
                disabled={dataLoading}
              />
              <TextField
                labelName={"Confirmar Contraseña"}
                id={"confirmPassword"}
                name={"confirmPassword"}
                type={"password"}
                formik={formik}
                disabled={dataLoading}
              />
            </>
          )}
          <SelectField
            label={"Empresa"}
            options={companies.map((item) => ({
              children: item.name,
              value: item.id,
            }))}
            disabled={isLoading || dataLoading}
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
            disabled={dataLoading}
          />
        </div>
        <Button type={"submit"} disabled={formik.isSubmitting || !isFormDirty}>
          {buttonChildren}
        </Button>
        {error && <ErrorText>{getFirebaseCodeMessage(error)}</ErrorText>}
      </form>
    </div>
  );
}
