import { useFormik } from "formik";
import { CompanyData } from "@ncl/app/shared/models/company.data";
import TextField from "@ncl/app/components/shared/text-field";
import Button from "@ncl/app/components/shared/button";
import ErrorText from "@ncl/app/components/shared/error-text";
import { FORM_ERROR_MESSAGE, getFirebaseCodeMessage } from "@ncl/app/shared";
import { useState } from "react";
import { createCompany } from "@ncl/app/lib/firebase/firestore/company";
import { useRouter } from "next/navigation";
import { ROUTES } from "@ncl/app/shared/constants/routes";
import * as Yup from "yup";
interface CompaniesFormProps {
  companyData?: CompanyData;
  buttonChildren: React.ReactNode;
}

export default function CompanyForm({
  companyData,
  buttonChildren,
}: CompaniesFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>("");

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    nit: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    phone: Yup.string()
      .matches(/^\d{10}$/, FORM_ERROR_MESSAGE.PHONE_INVALID)
      .required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    email: Yup.string()
      .email(FORM_ERROR_MESSAGE.EMAIL_INVALID)
      .required(FORM_ERROR_MESSAGE.EMAIL_REQUIRED),
    address: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  });

  const formik = useFormik<CompanyData>({
    initialValues: {
      name: companyData?.name || "",
      nit: companyData?.nit || "",
      email: companyData?.email || "",
      phone: companyData?.phone || "",
      address: companyData?.address || "",
      address2: companyData?.address2 || "",
      id: companyData?.id || "",
    },
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setError(null);
      const response = await createCompany(values);

      if (response.success) {
        router.push(ROUTES.COMPANIES);
      } else {
        setError(response?.error);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid md:grid-cols-2 gap-x-4 mb-6">
        <TextField
          labelName={"Nombre de la empresa"}
          id={"name"}
          name={"name"}
          formik={formik}
        />
        <TextField
          labelName={"Nit"}
          id={"nit"}
          name={"nit"}
          placeholder={"Ejemplo: 901000000-9"}
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
          type={"email"}
          formik={formik}
        />
        <TextField
          labelName={"Dirección"}
          id={"address"}
          name={"address"}
          formik={formik}
        />
        <TextField
          labelName={"Oficina/Local/Bodega"}
          id={"address2"}
          name={"address2"}
          formik={formik}
        />
      </div>
      <Button type={"submit"} disabled={formik.isSubmitting}>
        {buttonChildren}
      </Button>
      {error && <ErrorText>{getFirebaseCodeMessage(error)}</ErrorText>}
    </form>
  );
}
