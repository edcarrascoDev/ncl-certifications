import RadioGroup from "@ncl/app/components/shared/radio-group";
import TextField from "@ncl/app/components/shared/text-field";
import FileInput from "@ncl/app/components/shared/file-input";
import { useFormik } from "formik";
import { PrepareFormRequest } from "@ncl/app/shared/models";
import { useEffect } from "react";
import * as Yup from "yup";
import { FORM_ERROR_MESSAGE } from "@ncl/app/shared";

interface FormItem {
  label: string;
  description?: string;
  dateKey?: keyof PrepareFormRequest;
  radioKey: keyof PrepareFormRequest;
  obsKey: keyof PrepareFormRequest;
  imageKey: keyof PrepareFormRequest;
}
interface Props {
  title: string;
  partialData: Partial<PrepareFormRequest> | null;
  columns: string[];
  formItems: Array<FormItem>;
  handleSubmit: (data?: Partial<PrepareFormRequest>) => void;
  isSubmitting: boolean;
}
export default function TableFormStep({
  title,
  partialData,
  columns,
  formItems,
  handleSubmit,
  isSubmitting,
}: Props) {
  const keysToKeep = new Set(
    formItems.flatMap((item) => [
      item.obsKey,
      item.imageKey,
      item.radioKey,
      item.dateKey,
    ]),
  );

  const filteredInitialData = Object.fromEntries(
    Array.from(keysToKeep).map((key) => [
      key,
      partialData && key && partialData[key] ? partialData[key] : "",
    ]),
  );

  const filteredValidationSchema = Object.fromEntries(
    Array.from(keysToKeep)
      .filter((key) => key && key.startsWith("is"))
      .map((key) => [
        key,
        Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
      ]),
  );

  const formik = useFormik<Partial<PrepareFormRequest>>({
    initialValues: filteredInitialData,
    validationSchema: Yup.object().shape(filteredValidationSchema),
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
      <h2 className="text-xl font-semibold mb-2 p-2 bg-primary text-white rounded">
        {title}
      </h2>
      <div className="relative overflow-x-auto">
        <table className="table-form">
          <thead className={"table-form-head"}>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="p-3">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {formItems.map((item, index) => (
              <tr key={index}>
                <td className={"font-medium"}>{item.label}</td>
                <td>
                  {item.dateKey ? (
                    <TextField
                      labelName={""}
                      name={item.dateKey}
                      formik={formik}
                      type="date"
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td>
                  <RadioGroup
                    name={item.radioKey}
                    formik={formik}
                    options={[
                      { label: "Cumple", value: "true" },
                      { label: "No cumple", value: "false" },
                    ]}
                  />
                </td>
                <td className={"min-w-[300px] max-w-[300px]"}>
                  <TextField
                    labelName={""}
                    name={item.obsKey}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={item.imageKey}
                    defaultFile={formik.values[item.imageKey] as File}
                    onChange={(file: File | null) =>
                      formik.setFieldValue(item.imageKey, file)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
