import { useFormik } from "formik";
import { CompanyData } from "@ncl/app/shared/models/company.data";
import TextField from "@ncl/app/components/shared/text-field";
import Button from "@ncl/app/components/shared/button";
import ErrorText from "@ncl/app/components/shared/error-text";
import { getFirebaseCodeMessage } from "@ncl/app/shared";
import SelectField from "@ncl/app/components/shared/select-field";
import { useEffect, useState } from "react";
import { DepartmentsData } from "@ncl/app/shared/types";
import { companyFormValidator } from "@ncl/app/shared/validators";

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
  const [externalError, setExternalError] = useState<string | null>(null);
  const [departments, setDepartments] = useState<DepartmentsData[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json",
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setExternalError(
            "Ha ocurrido un error en una petición externa, por favor intenta más tarde",
          );
        }
      })
      .then((response: DepartmentsData[]) => {
        if (response.length > 0) {
          setDepartments(response);
          setCities(
            response.reduce((prev, curr) => [...prev, ...curr.ciudades], [""]),
          );
        } else {
          setExternalError(
            "Ha ocurrido un error en una petición externa, por favor intenta más tarde",
          );
        }
      })
      .catch((e) => {
        setExternalError(e);
      });
  }, []);

  const setCityFromDepartment = (value: string) => {
    setCities(
      departments.find((item) => item.departamento === value)?.ciudades || [],
    );
  };

  const formik = useFormik<CompanyData>({
    initialValues: {
      name: companyData?.name || "",
      documentId: companyData?.documentId || "",
      documentIdType: companyData?.documentIdType || "NIT",
      email: companyData?.email || "",
      phone: companyData?.phone || "",
      address: companyData?.address || "",
      city: companyData?.city || "",
      department: companyData?.department || "",
      address2: companyData?.address2 || "",
      id: companyData?.id || "",
    },
    enableReinitialize: true,
    validateOnChange: true,
    validationSchema: companyFormValidator,
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
          <SelectField
            groupClassname={"md:col-span-6"}
            label={"Departamento"}
            options={departments.map((item) => ({
              children: item.departamento,
              value: item.departamento,
            }))}
            disabled={dataLoading}
            id={"department"}
            name={"department"}
            formik={formik}
            onChange={(event) => {
              formik.handleChange(event);
              formik.setFieldValue("city", "");
              setCityFromDepartment(event.target.value as string);
            }}
          />
          <SelectField
            groupClassname={"md:col-span-6"}
            label={"Ciudad"}
            options={cities.map((item) => ({ children: item, value: item }))}
            disabled={dataLoading}
            id={"city"}
            name={"city"}
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
        {externalError && <ErrorText>{externalError}</ErrorText>}
      </form>
    </div>
  );
}
