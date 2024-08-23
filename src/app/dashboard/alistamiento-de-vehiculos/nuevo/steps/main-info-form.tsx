import { useFormik } from "formik";
import TextField from "@ncl/app/components/shared/text-field";
import { PrepareFormRequest } from "@ncl/app/shared/models";
import { useEffect } from "react";
import * as React from "react";
import * as Yup from "yup";
import { FORM_ERROR_MESSAGE } from "@ncl/app/shared";

export default function MainInfoForm({
  partialData,
  handleSubmit,
  isSubmitting,
}: {
  partialData: Partial<PrepareFormRequest> | null;
  handleSubmit: (data?: Partial<PrepareFormRequest>) => void;
  isSubmitting: boolean;
}) {
  const formik = useFormik<Partial<PrepareFormRequest>>({
    initialValues: {
      licensePlate: partialData?.licensePlate || "",
      internalNumber: partialData?.internalNumber || "",
      companyId: partialData?.companyId || "",
      companyName: partialData?.companyName || "",
      companyCity: partialData?.companyCity || "",
      companyDepartment: partialData?.companyDepartment || "",
      preparerName: partialData?.preparerName || "",
      preparerID: partialData?.preparerID || "",
      driverName: partialData?.driverName || "",
    },
    validateOnChange: true,
    validationSchema: Yup.object().shape({
      licensePlate: Yup.string()
        .matches(
          /^([A-Z]{3}\d{3}|[A-Z]{2}\d{4}|[A-Z]{3}\d{2}[A-Z])$/,
          FORM_ERROR_MESSAGE.PLATE_FORMAT,
        )
        .required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
      internalNumber: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
      companyId: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
      companyName: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
      companyCity: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
      preparerName: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
      driverName: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    }),
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (isSubmitting) {
      formik.handleSubmit();
      handleSubmit();
    }
  }, [isSubmitting]);

  return (
    <div className="step">
      <h2 className="text-xl font-semibold mb-6 p-2 bg-primary text-white rounded">
        Datos Generales
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid md:grid-cols-12 gap-x-4">
          <TextField
            groupClassname={"md:col-span-6"}
            labelName={"Placa del vehículo"}
            name={"licensePlate"}
            formik={formik}
            onChange={(event) =>
              formik.setFieldValue(
                "licensePlate",
                event.target.value.toUpperCase(),
              )
            }
            InputProps={{ style: { textTransform: "uppercase" } }}
          />
          <TextField
            groupClassname={"md:col-span-6"}
            labelName={"Número interno"}
            name={"internalNumber"}
            formik={formik}
          />
          <TextField
            groupClassname={"md:col-span-6"}
            labelName={"Empresa"}
            name={"companyName"}
            formik={formik}
            readOnly
          />
          <TextField
            groupClassname={"md:col-span-6"}
            labelName={"Ciudad"}
            name={"companyCity"}
            formik={formik}
            readOnly
          />
          <TextField
            groupClassname={"md:col-span-6"}
            labelName={"Encargado del alistamiento"}
            name={"preparerName"}
            formik={formik}
            readOnly
          />
          <TextField
            groupClassname={"md:col-span-6"}
            labelName={"Nombre del conductor"}
            name={"driverName"}
            formik={formik}
          />
        </div>
      </form>
    </div>
  );
}
