import { useFormik } from "formik";
import { CompanyData } from "@ncl/app/shared/models/company.data";
import TextField from "@ncl/app/components/shared/text-field";
import Button from "@ncl/app/components/shared/button";
import ErrorText from "@ncl/app/components/shared/error-text";
import { FORM_ERROR_MESSAGE, getFirebaseCodeMessage } from "@ncl/app/shared";
import * as Yup from "yup";
import SelectField from "@ncl/app/components/shared/select-field";
import { useEffect, useState } from "react";

interface CompaniesFormProps {
  companyData?: CompanyData;
  buttonChildren: React.ReactNode;
  dataLoading?: boolean;
  handleSubmit: (data: CompanyData) => void;
  error: string | null;
}

export default function CompanyForm({
  companyData,
  buttonChildren,
  dataLoading,
  handleSubmit,
  error,
}: CompaniesFormProps) {
  const [isFormDirty, setIsFormDirty] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    documentIdType: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    documentId: Yup.number()
      .typeError(FORM_ERROR_MESSAGE.NUMBER_INVALID)
      .required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
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
      documentId: companyData?.documentId || null,
      documentIdType: companyData?.documentIdType || "NIT",
      email: companyData?.email || "",
      phone: companyData?.phone || "",
      address: companyData?.address || "",
      address2: companyData?.address2 || "",
      id: companyData?.id || "",
    },
    enableReinitialize: true,
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    setIsFormDirty(
      JSON.stringify(formik.values) !== JSON.stringify(formik.initialValues),
    );
  }, [formik.values]);

  return (
    <div className={"form-container"}>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid md:grid-cols-12 gap-x-4 mb-6">
          <TextField
            groupClassname={"md:col-span-12"}
            labelName={"Nombre de la empresa"}
            id={"name"}
            name={"name"}
            formik={formik}
          />
          <SelectField
            groupClassname={"md:col-span-6"}
            label={"NIT/RUT"}
            options={[
              { children: "NIT", value: "NIT" },
              { children: "RUT", value: "RUT" },
            ]}
            disabled={dataLoading}
            id={"documentIdType"}
            name={"documentIdType"}
            formik={formik}
          />
          <TextField
            groupClassname={"md:col-span-6"}
            labelName={`Número del ${formik.values["documentIdType"]}`}
            id={"documentId"}
            name={"documentId"}
            placeholder={"Ejemplo: 901123456"}
            formik={formik}
            helperText={`Agregue el ${formik.values["documentIdType"]} sin número de verificación`}
          />
          <TextField
            groupClassname={"md:col-span-6"}
            labelName={"Teléfono"}
            id={"phone"}
            name={"phone"}
            formik={formik}
          />
          <TextField
            groupClassname={"md:col-span-6"}
            labelName={"Correo electrónico"}
            id={"email"}
            name={"email"}
            type={"email"}
            formik={formik}
          />
          <TextField
            groupClassname={"md:col-span-6"}
            labelName={"Dirección"}
            id={"address"}
            name={"address"}
            formik={formik}
          />
          <TextField
            groupClassname={"md:col-span-6"}
            labelName={"Oficina/Local/Bodega"}
            id={"address2"}
            name={"address2"}
            formik={formik}
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
