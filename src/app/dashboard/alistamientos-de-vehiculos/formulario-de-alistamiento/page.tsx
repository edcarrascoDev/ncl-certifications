"use client";
import TextField from "@ncl/app/components/shared/text-field";
import { useFormik } from "formik";
import TableForm from "@ncl/app/dashboard/alistamientos-de-vehiculos/formulario-de-alistamiento/steps/table-form";
import RadioGroup from "@ncl/app/components/shared/radio-group";
import FileInput from "@ncl/app/components/shared/file-input";
import Button from "@ncl/app/components/shared/button";
import { prepareFormValidator } from "@ncl/app/shared/validators";
import { fetchRequest } from "@ncl/app/shared/utils";
import { CompanyData, PrepareFormRequest } from "@ncl/app/shared/models";
import { prepareFormInitialValues } from "@ncl/app/shared";
import { useUser } from "@ncl/app/context/user-context";
import { useEffect, useState } from "react";
import BackdropLoading from "@ncl/app/components/shared/backdrop-loading";
import ErrorText from "@ncl/app/components/shared/error-text";

export default function Page() {
  const { user } = useUser();
  const [company, setCompany] = useState<CompanyData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(true);
    if (user) {
      fetchRequest("/api/companies/get-company-by-id", {
        userId: user.id,
        companyId: user.companyId,
      })
        .then((response) => {
          if (response.success) {
            setCompany(response.result as CompanyData);
          } else {
            console.error(response.error);
          }
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  const formik = useFormik({
    initialValues: prepareFormInitialValues(user, company),
    validationSchema: prepareFormValidator,
    validateOnChange: false,
    validateOnBlur: true,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: async (values: PrepareFormRequest, { setSubmitting }) => {
      try {
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
          const value = values[key as keyof PrepareFormRequest];
          if (value instanceof File) {
            formData.append(key, value, value.name);
          } else {
            formData.append(key, String(value));
          }
        });

        const response = await fetchRequest<PrepareFormRequest>(
          "/api/prepare-documents/create",
          formData,
        );

        console.log(response);
        if (response.success) {
          console.log("success");
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error("Error al subir las imágenes:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className={"form-container"}>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-steps">
          <div className="step">
            <h2 className="text-xl font-semibold mb-6 p-2 bg-primary text-white rounded">
              Datos Generales
            </h2>
            <div className="grid md:grid-cols-12 gap-x-4">
              <TextField
                groupClassname={"md:col-span-6"}
                labelName={"Placa del vehículo"}
                name={"licensePlate"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputProps={{ style: { textTransform: "uppercase" } }}
              />
              <TextField
                groupClassname={"md:col-span-6"}
                labelName={"Número interno"}
                name={"internalNumber"}
                formik={formik}
                disabled={isLoading}
              />
              <TextField
                groupClassname={"md:col-span-6"}
                labelName={"Empresa"}
                name={"companyName"}
                formik={formik}
                disabled={isLoading}
                readOnly
              />
              <TextField
                groupClassname={"md:col-span-6"}
                labelName={"Ciudad"}
                name={"companyCity"}
                formik={formik}
                disabled={isLoading}
                readOnly
              />
              <TextField
                groupClassname={"md:col-span-6"}
                labelName={"Encargado del alistamiento"}
                name={"preparerName"}
                formik={formik}
                disabled={isLoading}
                readOnly
              />
              <TextField
                groupClassname={"md:col-span-6"}
                labelName={"Nombre del conductor"}
                name={"driverName"}
                formik={formik}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Documentos
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Licencia de tránsito</td>
                <td>Validación de licencia</td>
                <td>
                  <RadioGroup
                    name={"isLicenseTransitValid"}
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
                    name={"licenseTransitObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"licenseTransitFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("licenseTransitFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>SOAT</td>
                <td>Validación de SOAT</td>
                <td>
                  <RadioGroup
                    name={"isSOATValid"}
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
                    name={"SOATObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"SOATFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("SOATFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Revisión preventiva</td>
                <td>Estado de la revisión</td>
                <td>
                  <RadioGroup
                    name={"isPrevRevisionValid"}
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
                    name={"prevRevisionObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"prevRevisionFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("prevRevisionFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>RTM Y EC</td>
                <td>Validez</td>
                <td>
                  <RadioGroup
                    name={"isRTMAndECValid"}
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
                    name={"RTMAndECObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"RTMAndECFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("RTMAndECFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Póliza RCE y RCC</td>
                <td>Validación de póliza</td>
                <td>
                  <RadioGroup
                    name={"isPolicyRCEAndRCCValid"}
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
                    name={"policyRCEAndRCCObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"policyRCEAndRCCFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("policyRCEAndRCCFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Tarjeta de operación</td>
                <td>Validación de tarjeta</td>
                <td>
                  <RadioGroup
                    name={"isOperationCardValid"}
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
                    name={"operationCardObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"operationCardFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("operationCardFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Licencia de conducción</td>
                <td>Validación de licencia</td>
                <td>
                  <RadioGroup
                    name={"isDriverLicenseValid"}
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
                    name={"driverLicenseObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"driverLicenseFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("driverLicenseFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Motor
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Fugas de motor</td>
                <td>Revisión de fugas</td>
                <td>
                  <RadioGroup
                    name={"isEngineLeaksValid"}
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
                    name={"engineLeaksObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"engineLeaksFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("engineLeaksFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Correas
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Tensión</td>
                <td>Revisión de tensión</td>
                <td>
                  <RadioGroup
                    name={"isBeltTensionValid"}
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
                    name={"beltTensionObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"beltTensionFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("beltTensionFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Tapas
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Tapas de combustible</td>
                <td>Estado de tapas</td>
                <td>
                  <RadioGroup
                    name={"isFuelCapsValid"}
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
                    name={"fuelCapsObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"fuelCapsFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("fuelCapsFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Transmisión de potencia
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Embrague, caja diferencial</td>
                <td>Estado de transmisión</td>
                <td>
                  <RadioGroup
                    name={"isTransmissionStatusValid"}
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
                    name={"transmissionStatusObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"transmissionStatusFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("transmissionStatusFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Batería
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Estado</td>
                <td>Revisión de estado</td>
                <td>
                  <RadioGroup
                    name={"isBatteryStatusValid"}
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
                    name={"batteryStatusObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"batteryStatusFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("batteryStatusFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Direccionales
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Delanteras</td>
                <td>Estado de direccionales</td>
                <td>
                  <RadioGroup
                    name={"isFrontTurnSignalsValid"}
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
                    name={"frontTurnSignalsObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"frontTurnSignalsFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("frontTurnSignalsFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Traseras</td>
                <td>Estado de direccionales</td>
                <td>
                  <RadioGroup
                    name={"isRearTurnSignalsValid"}
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
                    name={"rearTurnSignalsObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"rearTurnSignalsFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("rearTurnSignalsFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Luces
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Altas</td>
                <td>Estado de luces</td>
                <td>
                  <RadioGroup
                    name={"isHighLightsValid"}
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
                    name={"highLightsObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"highLightsFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("highLightsFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Bajas</td>
                <td>Estado de luces</td>
                <td>
                  <RadioGroup
                    name={"isLowLightsValid"}
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
                    name={"lowLightsObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"lowLightsFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("lowLightsFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Stops</td>
                <td>Estado de luces</td>
                <td>
                  <RadioGroup
                    name={"isStopsValid"}
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
                    name={"stopsObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"stopsFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("stopsFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Reversa</td>
                <td>Estado de luces</td>
                <td>
                  <RadioGroup
                    name={"isReverseLightValid"}
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
                    name={"reverseLightObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"reverseLightFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("reverseLightFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Parqueo</td>
                <td>Estado de luces</td>
                <td>
                  <RadioGroup
                    name={"isParkingLightsValid"}
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
                    name={"parkingLightsObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"parkingLightsFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("parkingLightsFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Tablero</td>
                <td>Estado de luces</td>
                <td>
                  <RadioGroup
                    name={"isDashboardLightsValid"}
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
                    name={"dashboardLightsObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"dashboardLightsFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("dashboardLightsFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Suspensión y dirección
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Inspección sensorial</td>
                <td>Estado de suspensión</td>
                <td>
                  <RadioGroup
                    name={"isSuspensionStatusValid"}
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
                    name={"suspensionStatusObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"suspensionStatusFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("suspensionStatusFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Inspección sensorial</td>
                <td>Estado de la dirección</td>
                <td>
                  <RadioGroup
                    name={"isPowerSteeringStatusValid"}
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
                    name={"powerSteeringStatusObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"powerSteeringStatusFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("powerSteeringStatusFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Limpiaparabrisas-aditivos niveles
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Delantero/izquierdo/atrás</td>
                <td>Estado de limpiaparabrisas</td>
                <td>
                  <RadioGroup
                    name={"isWiperStatusValid"}
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
                    name={"wiperStatusObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"wiperStatusFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("wiperStatusFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Frenos
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Principal</td>
                <td>Estado de frenos</td>
                <td>
                  <RadioGroup
                    name={"isMainBrakesStatusValid"}
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
                    name={"mainBrakesStatusObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"mainBrakesStatusFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("mainBrakesStatusFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Emergencia</td>
                <td>Estado de frenos</td>
                <td>
                  <RadioGroup
                    name={"isEmergencyBrakesStatusValid"}
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
                    name={"emergencyBrakesStatusObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"emergencyBrakesStatusFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("emergencyBrakesStatusFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Llantas
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Delanteras</td>
                <td>Estado de llantas</td>
                <td>
                  <RadioGroup
                    name={"isFrontTyresStatusValid"}
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
                    name={"frontTyresStatusObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"frontTyresStatusFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("frontTyresStatusFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Traseras</td>
                <td>Estado de llantas</td>
                <td>
                  <RadioGroup
                    name={"isRearTyresStatusValid"}
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
                    name={"rearTyresStatusObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"rearTyresStatusFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("rearTyresStatusFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Repuesto</td>
                <td>Estado de llantas</td>
                <td>
                  <RadioGroup
                    name={"isSpareTyreStatusValid"}
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
                    name={"spareTyreStatusObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"spareTyreStatusFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("spareTyreStatusFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Espejos
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Laterales izq/der</td>
                <td>Estado de espejos</td>
                <td>
                  <RadioGroup
                    name={"isSideMirrorsStatusValid"}
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
                    name={"sideMirrorsStatusObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"sideMirrorsStatusFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("sideMirrorsStatusFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Retrovisor</td>
                <td>Estado de espejos</td>
                <td>
                  <RadioGroup
                    name={"isRearviewStatusValid"}
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
                    name={"rearviewStatusObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"rearviewStatusFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("rearviewStatusFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Salidas de emergencia/Puertas
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Según carrocería</td>
                <td>Martillos, señales, cantidad, apertura</td>
                <td>
                  <RadioGroup
                    name={"isEmergencyExitValid"}
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
                    name={"emergencyExitObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"emergencyExitFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("emergencyExitFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Pito
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Funcional</td>
                <td>Sensorial</td>
                <td>
                  <RadioGroup
                    name={"isHornValid"}
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
                    name={"hornObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"hornFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("hornFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Niveles de fluidos
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Sistema de frenos</td>
                <td>Verificar los niveles</td>
                <td>
                  <RadioGroup
                    name={"isFluidLevelBrakesValid"}
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
                    name={"fluidLevelBrakesObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"fluidLevelBrakesFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("fluidLevelBrakesFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Aceite</td>
                <td>Verificar los niveles de Aceite</td>
                <td>
                  <RadioGroup
                    name={"isFluidLevelOilValid"}
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
                    name={"fluidLevelOilObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"fluidLevelOilFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("fluidLevelOilFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Refrigerante</td>
                <td>Verificar los niveles del refrigerante</td>
                <td>
                  <RadioGroup
                    name={"isFluidLevelRefrigerantValid"}
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
                    name={"fluidLevelRefrigerantObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"fluidLevelRefrigerantFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("fluidLevelRefrigerantFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Filtros húmedos y secos
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Presencia</td>
                <td>Verificar estado</td>
                <td>
                  <RadioGroup
                    name={"isDryAndWetFiltersValid"}
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
                    name={"dryAndWetFiltersObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"dryAndWetFiltersFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("dryAndWetFiltersFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Seguridad pasiva
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>
                  Cinturones, sillas, apoya cabezas
                </td>
                <td>Verificar estado</td>
                <td>
                  <RadioGroup
                    name={"isPassiveSafetyValid"}
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
                    name={"passiveSafetyObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"passiveSafetyFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("passiveSafetyFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Última fecha de mantenimiento
            </h2>
            <TableForm
              columns={["Documento", "Fecha", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Cambio de aceite</td>
                <td>
                  <TextField
                    name="lastOilChangeDate"
                    labelName=""
                    formik={formik}
                    type="date"
                  />
                </td>
                <td>
                  <RadioGroup
                    name={"isLastOilChangeValid"}
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
                    name={"lastOilChangeObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"lastOilChangeFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("lastOilChangeFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Aseo</td>
                <td>
                  <TextField
                    name="lastCleanDate"
                    labelName=""
                    formik={formik}
                    type="date"
                  />
                </td>
                <td>
                  <RadioGroup
                    name={"isLastCleanValid"}
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
                    name={"lastCleanObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"lastCleanFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("lastCleanFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Alineación/Balanceo</td>
                <td>
                  <TextField
                    name="lastAlignmentBalanceDate"
                    labelName=""
                    formik={formik}
                    type="date"
                  />
                </td>
                <td>
                  <RadioGroup
                    name={"isLastAlignmentBalanceValid"}
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
                    name={"lastAlignmentBalanceObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"lastAlignmentBalanceFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("lastAlignmentBalanceFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Sincronización</td>
                <td>
                  <TextField
                    name="lastSyncDate"
                    labelName=""
                    formik={formik}
                    type="date"
                  />
                </td>
                <td>
                  <RadioGroup
                    name={"isLastSyncValid"}
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
                    name={"lastSyncObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"lastSyncFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("lastSyncFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Cambio de llantas</td>
                <td>
                  <TextField
                    name="lastTyreChangesDate"
                    labelName=""
                    formik={formik}
                    type="date"
                  />
                </td>
                <td>
                  <RadioGroup
                    name={"isLastTyreChangesValid"}
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
                    name={"lastTyreChangesObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"lastTyreChangesFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("lastTyreChangesFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Extintor
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Vencimiento</td>
                <td>Verificar fecha</td>
                <td>
                  <RadioGroup
                    name={"isExtinguisherValid"}
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
                    name={"extinguisherObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"extinguisherFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("extinguisherFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Capacidad</td>
                <td>Libras</td>
                <td>
                  <RadioGroup
                    name={"isExtinguisherSizeValid"}
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
                    name={"extinguisherSizeObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"extinguisherSizeFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("extinguisherFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Herramientas
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Alicates</td>
                <td>Presencia y estado</td>
                <td>
                  <RadioGroup
                    name={"isPliersValid"}
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
                    name={"pliersObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"pliersFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("pliersFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Destornilladores</td>
                <td>Presencia y estado</td>
                <td>
                  <RadioGroup
                    name={"isScrewdriversValid"}
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
                    name={"screwdriversObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"screwdriversFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("screwdriversFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Llaves de expansión y fijas</td>
                <td>Presencia y estado</td>
                <td>
                  <RadioGroup
                    name={"isWrenchValid"}
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
                    name={"wrenchObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"wrenchFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("wrenchFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Cruceta</td>
                <td>Presencia y estado</td>
                <td>
                  <RadioGroup
                    name={"isCrossPieceValid"}
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
                    name={"crossPieceObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"crossPieceFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("crossPieceFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Gato</td>
                <td>Presencia y estado</td>
                <td>
                  <RadioGroup
                    name={"isJackValid"}
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
                    name={"jackObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"jackFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("jackFile", file)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className={"font-medium"}>Tacos</td>
                <td>Presencia y estado</td>
                <td>
                  <RadioGroup
                    name={"isTyreShockValid"}
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
                    name={"tyreShockObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"tyreShockFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("tyreShockFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Señales
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Reflectivas, conos,</td>
                <td>Presencia y estado</td>
                <td>
                  <RadioGroup
                    name={"isWarningSignsValid"}
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
                    name={"warningSignsObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"warningSignsFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("warningSignsFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Chaleco
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Chaleco reflectivo</td>
                <td>Presencia y estado</td>
                <td>
                  <RadioGroup
                    name={"isSafetyVestsValid"}
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
                    name={"safetyVestsObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"safetyVestsFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("safetyVestsFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Botiquín
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>
                  Gasas, curas, algodón, micropore, guantes, jabón
                </td>
                <td>Presencia y estado</td>
                <td>
                  <RadioGroup
                    name={"isFirstAidKitValid"}
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
                    name={"firstAidKitObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"firstAidKitFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("firstAidKitFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold mt-4 mb-0  p-2 bg-primary text-white rounded">
              Residuos
            </h2>
            <TableForm
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
            >
              <tr>
                <td className={"font-medium"}>Baterías, aceites, lodos</td>
                <td>Normativa ambiental</td>
                <td>
                  <RadioGroup
                    name={"isWasteValid"}
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
                    name={"wasteObs"}
                    multiline
                    maxRows={2}
                    formik={formik}
                  />
                  <FileInput
                    label={"seleccionar imagen"}
                    id={"wasteFile"}
                    onChange={(file: File | null) =>
                      formik.setFieldValue("wasteFile", file)
                    }
                  />
                </td>
              </tr>
            </TableForm>
          </div>
        </div>
        {!formik.isValid && (
          <ErrorText>
            Hay campos requeridos sin llenar, por favor revíselos e inténtelo
            nuevamente
          </ErrorText>
        )}
        <Button className="mt-4" type={"submit"}>
          Generar documento
        </Button>
        <BackdropLoading open={formik.isSubmitting || isLoading} />
      </form>
    </div>
  );
}
