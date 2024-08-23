"use client";
import Button from "@ncl/app/components/shared/button";
import {
  fetchRequest,
  filterEmptyValues,
  getFirebaseCodeMessage,
} from "@ncl/app/shared/utils";
import {
  CompanyData,
  PrepareDocument,
  PrepareFormRequest,
} from "@ncl/app/shared/models";
import { PREPARE_FORM_STEPS, ROUTES } from "@ncl/app/shared";
import { useUser } from "@ncl/app/context/user-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainInfoForm from "@ncl/app/dashboard/alistamiento-de-vehiculos/nuevo/steps/main-info-form";
import { LinearProgress } from "@mui/material";
import TableFormStep from "@ncl/app/dashboard/alistamiento-de-vehiculos/nuevo/steps/table-form-step";
import { useUi } from "@ncl/app/context/ui-context";
import { usePrepareDocument } from "@ncl/app/context/prepare-document-context";

export default function Page() {
  const { user } = useUser();
  const { setLoading, setSnackbarData } = useUi();
  const { setDocument } = usePrepareDocument();
  const router = useRouter();
  const [company, setCompany] = useState<CompanyData>();
  const [onNextStep, setOnNextStep] = useState<boolean>(false);
  const [formValues, setFormValues] =
    useState<Partial<PrepareFormRequest> | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    if (user) {
      fetchRequest<CompanyData>("/api/companies/get-company-by-id", {
        userId: user.id,
        companyId: user.companyId,
      })
        .then((response) => {
          if (response.success) {
            setFormValues({
              companyId: (response.result as CompanyData).id,
              companyName: (response.result as CompanyData).name,
              companyCity: (response.result as CompanyData).city,
              companyDepartment: (response.result as CompanyData).department,
              preparerName: `${user.name} ${user.lastName}`,
              preparerID: user.id,
            });
            setCompany(response.result as CompanyData);
          } else {
            setSnackbarData({
              open: true,
              message: getFirebaseCodeMessage(response?.error),
              messageType: "error",
            });
          }
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleStepSubmit = (data: Partial<PrepareFormRequest> | undefined) => {
    setOnNextStep(false);
    if (data) {
      const newFormValues = formValues ? { ...formValues, ...data } : data;
      setFormValues(newFormValues);
      if (PREPARE_FORM_STEPS.length === currentStep) {
        handleSubmit(newFormValues as PrepareFormRequest);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleSubmit = async (data: PrepareFormRequest) => {
    setLoading(true);
    try {
      const filteredData = filterEmptyValues<PrepareFormRequest>(data);
      const formData = new FormData();

      Object.keys(filteredData).forEach((key) => {
        const value = filteredData[key as keyof PrepareFormRequest];
        if (value instanceof File) {
          formData.append(key, value, value.name);
        } else {
          formData.append(key, String(value));
        }
      });

      const response = await fetchRequest<PrepareDocument>(
        "/api/prepare-documents/create",
        formData,
      );

      setLoading(false);
      if (response.success && response.result) {
        setDocument(response.result as PrepareDocument);
        router.push(
          `${ROUTES.CARS_PREPARE}/${(response.result as PrepareDocument).id}`,
        );
        setSnackbarData({
          open: true,
          message: "El documento se ha generado satisfactoriamente",
          messageType: "success",
        });
      } else {
        setSnackbarData({
          open: true,
          message: getFirebaseCodeMessage(response?.error),
          messageType: "error",
        });
      }
    } catch (error) {
      console.error("Error al subir las imágenes:", error);
      setSnackbarData({
        open: true,
        message: "Error al subir las imágenes",
        messageType: "error",
      });
    }
  };
  return (
    <div className={"form-container"}>
      <h2 className="py-4 mb-4 text-center text-2xl font-semibold">
        Formulario de alistamiento de vehículos
      </h2>
      {user && company && (
        <div className="form-steps p-2 rounded bg-gray-50 border">
          {currentStep ===
            PREPARE_FORM_STEPS.indexOf("Datos generales") + 1 && (
            <MainInfoForm
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep === PREPARE_FORM_STEPS.indexOf("Documentos") + 1 && (
            <TableFormStep
              title="Documentos"
              formItems={[
                {
                  label: "Licencia de tránsito",
                  description: "Validación de licencia",
                  radioKey: "isLicenseTransitValid",
                  obsKey: "licenseTransitObs",
                  imageKey: "licenseTransitFile",
                },
                {
                  label: "SOAT",
                  description: "Validación de licencia",
                  radioKey: "isSOATValid",
                  obsKey: "SOATObs",
                  imageKey: "SOATFile",
                },
                {
                  label: "Revisión preventiva",
                  description: "Validación de licencia",
                  radioKey: "isPrevRevisionValid",
                  obsKey: "prevRevisionObs",
                  imageKey: "prevRevisionFile",
                },
                {
                  label: "RTM Y EC",
                  description: "Validación de licencia",
                  radioKey: "isRTMAndECValid",
                  obsKey: "RTMAndECObs",
                  imageKey: "RTMAndECFile",
                },
                {
                  label: "Póliza RCE y RCC",
                  description: "Validación de licencia",
                  radioKey: "isPolicyRCEAndRCCValid",
                  obsKey: "policyRCEAndRCCObs",
                  imageKey: "RTMAndECFile",
                },
                {
                  label: "Tarjeta de operación",
                  description: "Validación de licencia",
                  radioKey: "isOperationCardValid",
                  obsKey: "operationCardObs",
                  imageKey: "operationCardFile",
                },
                {
                  label: "Licencia de conducción",
                  description: "Validación de licencia",
                  radioKey: "isDriverLicenseValid",
                  obsKey: "driverLicenseObs",
                  imageKey: "driverLicenseFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep === PREPARE_FORM_STEPS.indexOf("Motor") + 1 && (
            <TableFormStep
              title="Motor"
              formItems={[
                {
                  label: "Fugas de motor",
                  description: "Verificar fugas niveles",
                  radioKey: "isEngineLeaksValid",
                  obsKey: "engineLeaksObs",
                  imageKey: "engineLeaksFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep === PREPARE_FORM_STEPS.indexOf("Correas") + 1 && (
            <TableFormStep
              title="Correas"
              formItems={[
                {
                  label: "Tensión",
                  description: "Verificar tensión de correas",
                  radioKey: "isBeltTensionValid",
                  obsKey: "beltTensionObs",
                  imageKey: "beltTensionFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep === PREPARE_FORM_STEPS.indexOf("Tapas") + 1 && (
            <TableFormStep
              title="Tapas"
              formItems={[
                {
                  label: "Tapas de combustible",
                  description: "Verificar estado y funcionamiento",
                  radioKey: "isFuelCapsValid",
                  obsKey: "fuelCapsObs",
                  imageKey: "fuelCapsFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep ===
            PREPARE_FORM_STEPS.indexOf("Transmisión de potencia") + 1 && (
            <TableFormStep
              title="Transmisión de potencia"
              formItems={[
                {
                  label: "Embrague, caja, diferencial",
                  description: "Verificar estado y funcionamiento",
                  radioKey: "isTransmissionStatusValid",
                  obsKey: "transmissionStatusObs",
                  imageKey: "transmissionStatusFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep === PREPARE_FORM_STEPS.indexOf("Batería") + 1 && (
            <TableFormStep
              title="Batería"
              formItems={[
                {
                  label: "Estado de la batería",
                  description: "Verificar estado y funcionamiento",
                  radioKey: "isBatteryStatusValid",
                  obsKey: "batteryStatusObs",
                  imageKey: "batteryStatusFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep === PREPARE_FORM_STEPS.indexOf("Direccionales") + 1 && (
            <TableFormStep
              title="Direccionales"
              formItems={[
                {
                  label: "Delanteras",
                  description: "Verificar funcionamiento",
                  radioKey: "isFrontTurnSignalsValid",
                  obsKey: "frontTurnSignalsObs",
                  imageKey: "frontTurnSignalsFile",
                },
                {
                  label: "Traseras",
                  description: "Verificar funcionamiento",
                  radioKey: "isRearTurnSignalsValid",
                  obsKey: "rearTurnSignalsObs",
                  imageKey: "rearTurnSignalsFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep === PREPARE_FORM_STEPS.indexOf("Luces") + 1 && (
            <TableFormStep
              title="Luces"
              formItems={[
                {
                  label: "Altas",
                  description: "Verificar funcionamiento",
                  radioKey: "isHighLightsValid",
                  obsKey: "highLightsObs",
                  imageKey: "highLightsFile",
                },
                {
                  label: "Bajas",
                  description: "Verificar funcionamiento",
                  radioKey: "isLowLightsValid",
                  obsKey: "lowLightsObs",
                  imageKey: "lowLightsFile",
                },
                {
                  label: "Stops",
                  description: "Verificar funcionamiento",
                  radioKey: "isStopsValid",
                  obsKey: "stopsObs",
                  imageKey: "stopsFile",
                },
                {
                  label: "Reversa",
                  description: "Verificar funcionamiento",
                  radioKey: "isReverseLightValid",
                  obsKey: "reverseLightObs",
                  imageKey: "reverseLightFile",
                },
                {
                  label: "Parqueo",
                  description: "Verificar funcionamiento",
                  radioKey: "isParkingLightsValid",
                  obsKey: "parkingLightsObs",
                  imageKey: "parkingLightsFile",
                },
                {
                  label: "Tablero",
                  description: "Verificar funcionamiento",
                  radioKey: "isDashboardLightsValid",
                  obsKey: "dashboardLightsObs",
                  imageKey: "dashboardLightsFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep ===
            PREPARE_FORM_STEPS.indexOf("Suspensión y dirección") + 1 && (
            <TableFormStep
              title="Suspensión y dirección"
              formItems={[
                {
                  label: "Inspec.sensorial",
                  description: "Verificar estado de la suspensión",
                  radioKey: "isSuspensionStatusValid",
                  obsKey: "suspensionStatusObs",
                  imageKey: "suspensionStatusFile",
                },
                {
                  label: "Inspec.sensorial",
                  description: "Verificar estado de la dirección",
                  radioKey: "isPowerSteeringStatusValid",
                  obsKey: "powerSteeringStatusObs",
                  imageKey: "powerSteeringStatusFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep ===
            PREPARE_FORM_STEPS.indexOf("Limpiaparabrisas") + 1 && (
            <TableFormStep
              title="Limpiaparabrisas"
              formItems={[
                {
                  label: "DER/IZQ/TRASERO",
                  description:
                    "Plumillas en buen estado, aditivos, agua, shampoo",
                  radioKey: "isWiperStatusValid",
                  obsKey: "wiperStatusObs",
                  imageKey: "wiperStatusFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep === PREPARE_FORM_STEPS.indexOf("Frenos") + 1 && (
            <TableFormStep
              title="Frenos"
              formItems={[
                {
                  label: "Principales",
                  description: "Verificar estado",
                  radioKey: "isMainBrakesStatusValid",
                  obsKey: "mainBrakesStatusObs",
                  imageKey: "mainBrakesStatusFile",
                },
                {
                  label: "Emergencia",
                  description: "Verificar estado",
                  radioKey: "isEmergencyBrakesStatusValid",
                  obsKey: "emergencyBrakesStatusObs",
                  imageKey: "emergencyBrakesStatusFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep === PREPARE_FORM_STEPS.indexOf("Llantas") + 1 && (
            <TableFormStep
              title="Llantas"
              formItems={[
                {
                  label: "Delanteras",
                  description:
                    "Verificar estado, profundidad del labrado y presión",
                  radioKey: "isFrontTyresStatusValid",
                  obsKey: "frontTyresStatusObs",
                  imageKey: "frontTyresStatusFile",
                },
                {
                  label: "Traseras",
                  description:
                    "Verificar estado, profundidad del labrado y presión",
                  radioKey: "isRearTyresStatusValid",
                  obsKey: "rearTyresStatusObs",
                  imageKey: "rearTyresStatusFile",
                },
                {
                  label: "Repuesto",
                  description:
                    "Verificar estado, profundidad del labrado y presión",
                  radioKey: "isSpareTyreStatusValid",
                  obsKey: "spareTyreStatusObs",
                  imageKey: "spareTyreStatusFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep === PREPARE_FORM_STEPS.indexOf("Espejos") + 1 && (
            <TableFormStep
              title="Espejos"
              formItems={[
                {
                  label: "Laterales IZQ/DER",
                  description:
                    "Verificar estado de limpieza sin daños y ubicación",
                  radioKey: "isSideMirrorsStatusValid",
                  obsKey: "sideMirrorsStatusObs",
                  imageKey: "sideMirrorsStatusFile",
                },
                {
                  label: "Retrovisor",
                  description:
                    "Verificar estado de limpieza sin daños y ubicación",
                  radioKey: "isRearviewStatusValid",
                  obsKey: "rearviewStatusObs",
                  imageKey: "rearviewStatusFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep ===
            PREPARE_FORM_STEPS.indexOf("Salidas de emergencia, puertas") +
              1 && (
            <TableFormStep
              title="Salidas de emergencia, puertas"
              formItems={[
                {
                  label: "Según carrocería",
                  description:
                    "Verificar martillos, señales, cantidad y  apertura",
                  radioKey: "isEmergencyExitValid",
                  obsKey: "emergencyExitObs",
                  imageKey: "emergencyExitFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep === PREPARE_FORM_STEPS.indexOf("Pito") + 1 && (
            <TableFormStep
              title="Pito"
              formItems={[
                {
                  label: "Funcional",
                  description: "Sensorial",
                  radioKey: "isHornValid",
                  obsKey: "hornObs",
                  imageKey: "hornFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep ===
            PREPARE_FORM_STEPS.indexOf("Niveles de fluido") + 1 && (
            <TableFormStep
              title="Niveles de fluido"
              formItems={[
                {
                  label: "Sistema frenos",
                  description:
                    "Verificar los niveles, fugas, drenaje, sensorial",
                  radioKey: "isFluidLevelBrakesValid",
                  obsKey: "fluidLevelBrakesObs",
                  imageKey: "fluidLevelBrakesFile",
                },
                {
                  label: "Aceite",
                  description:
                    "Verificar los niveles, fugas, drenaje, sensorial",
                  radioKey: "isFluidLevelOilValid",
                  obsKey: "fluidLevelOilObs",
                  imageKey: "fluidLevelOilFile",
                },
                {
                  label: "Refrigerante",
                  description:
                    "Verificar los niveles, fugas, drenaje, sensorial",
                  radioKey: "isFluidLevelRefrigerantValid",
                  obsKey: "fluidLevelRefrigerantObs",
                  imageKey: "fluidLevelRefrigerantFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep ===
            PREPARE_FORM_STEPS.indexOf("Filtros húmedos y secos") + 1 && (
            <TableFormStep
              title="Filtros húmedos y secos"
              formItems={[
                {
                  label: "Presencia",
                  description: "Verificar estado",
                  radioKey: "isDryAndWetFiltersValid",
                  obsKey: "dryAndWetFiltersObs",
                  imageKey: "dryAndWetFiltersFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep ===
            PREPARE_FORM_STEPS.indexOf("Seguridad pasiva") + 1 && (
            <TableFormStep
              title="Seguridad pasiva"
              formItems={[
                {
                  label: "Cinturones, sillas, apoyacabezas",
                  description: "Sensorial",
                  radioKey: "isPassiveSafetyValid",
                  obsKey: "passiveSafetyObs",
                  imageKey: "passiveSafetyFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep ===
            PREPARE_FORM_STEPS.indexOf("Última fecha de mantenimiento") + 1 && (
            <TableFormStep
              title="Última fecha de mantenimiento"
              formItems={[
                {
                  label: "Cambio de aceite",
                  dateKey: "lastOilChangeDate",
                  radioKey: "isLastOilChangeValid",
                  obsKey: "lastOilChangeObs",
                  imageKey: "lastOilChangeFile",
                },
                {
                  label: "Aseo",
                  dateKey: "lastCleanDate",
                  radioKey: "isLastCleanValid",
                  obsKey: "lastCleanObs",
                  imageKey: "lastCleanFile",
                },
                {
                  label: "Alineación/Balanceo",
                  dateKey: "lastAlignmentBalanceDate",
                  radioKey: "isLastAlignmentBalanceValid",
                  obsKey: "lastAlignmentBalanceObs",
                  imageKey: "lastAlignmentBalanceFile",
                },
                {
                  label: "Sincronización",
                  dateKey: "lastSyncDate",
                  radioKey: "isLastSyncValid",
                  obsKey: "lastSyncObs",
                  imageKey: "lastSyncFile",
                },
                {
                  label: "Cambio de llantas",
                  dateKey: "lastTyreChangesDate",
                  radioKey: "isLastTyreChangesValid",
                  obsKey: "lastTyreChangesObs",
                  imageKey: "lastTyreChangesFile",
                },
              ]}
              columns={["Documento", "Fecha", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep === PREPARE_FORM_STEPS.indexOf("Extintor") + 1 && (
            <TableFormStep
              title="Extintor"
              formItems={[
                {
                  label: "Fecha de vencimiento",
                  description: "Anillo, seguros, manómetro",
                  radioKey: "isExtinguisherValid",
                  obsKey: "extinguisherObs",
                  imageKey: "extinguisherFile",
                },
                {
                  label: "Capacidad",
                  description: "Libras",
                  radioKey: "isExtinguisherSizeValid",
                  obsKey: "extinguisherSizeObs",
                  imageKey: "extinguisherSizeFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep === PREPARE_FORM_STEPS.indexOf("Herramientas") + 1 && (
            <TableFormStep
              title="Herramientas"
              formItems={[
                {
                  label: "Alicates",
                  description: "Presencia y estado",
                  radioKey: "isPliersValid",
                  obsKey: "pliersObs",
                  imageKey: "pliersFile",
                },
                {
                  label: "Destornilladores",
                  description: "Presencia y estado",
                  radioKey: "isScrewdriversValid",
                  obsKey: "screwdriversObs",
                  imageKey: "screwdriversFile",
                },
                {
                  label: "Llaves de expansión y fijas",
                  description: "Presencia y estado",
                  radioKey: "isWrenchValid",
                  obsKey: "wrenchObs",
                  imageKey: "wrenchFile",
                },
                {
                  label: "Cruceta",
                  description: "Presencia y estado",
                  radioKey: "isCrossPieceValid",
                  obsKey: "crossPieceObs",
                  imageKey: "crossPieceFile",
                },
                {
                  label: "Gato",
                  description: "Presencia y estado",
                  radioKey: "isJackValid",
                  obsKey: "jackObs",
                  imageKey: "jackFile",
                },
                {
                  label: "Taco",
                  description: "Presencia y estado",
                  radioKey: "isTyreShockValid",
                  obsKey: "tyreShockObs",
                  imageKey: "tyreShockFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep === PREPARE_FORM_STEPS.indexOf("Señales") + 1 && (
            <TableFormStep
              title="Señales"
              formItems={[
                {
                  label: "Reflectivas y conos",
                  description: "Cintas, conos y seguridad",
                  radioKey: "isWarningSignsValid",
                  obsKey: "warningSignsObs",
                  imageKey: "warningSignsFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep === PREPARE_FORM_STEPS.indexOf("Chaleco") + 1 && (
            <TableFormStep
              title="Chaleco"
              formItems={[
                {
                  label: "Estado",
                  description: "Reflectivo",
                  radioKey: "isSafetyVestsValid",
                  obsKey: "safetyVestsObs",
                  imageKey: "safetyVestsFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep === PREPARE_FORM_STEPS.indexOf("Botiquín") + 1 && (
            <TableFormStep
              title="Botiquín"
              formItems={[
                {
                  label: "Estado/vencimiento",
                  description:
                    "Gasas, curas, algodón, micropore, guantes, jabón",
                  radioKey: "isFirstAidKitValid",
                  obsKey: "firstAidKitObs",
                  imageKey: "firstAidKitFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}
          {currentStep === PREPARE_FORM_STEPS.indexOf("Residuos") + 1 && (
            <TableFormStep
              title="Residuos"
              formItems={[
                {
                  label: "Baterías, aceites, lodos",
                  description: "Normativa ambiental",
                  radioKey: "isWasteValid",
                  obsKey: "wasteObs",
                  imageKey: "wasteFile",
                },
              ]}
              columns={["Documento", "Criterio", "Resultado", "Observaciones"]}
              partialData={formValues}
              handleSubmit={(data) => handleStepSubmit(data)}
              isSubmitting={onNextStep}
            />
          )}

          <div className="step-actions pt-2">
            <LinearProgress
              variant="determinate"
              value={(currentStep / PREPARE_FORM_STEPS.length) * 100}
            />
            <div className="flex justify-between mt-3">
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                className={currentStep === 1 ? "!hidden" : ""}
                startIcon={"arrow_back_ios"}
              >
                Atrás
              </Button>
              <div />
              <Button
                onClick={() => setOnNextStep(true)}
                endIcon={
                  PREPARE_FORM_STEPS.length === currentStep
                    ? "file_open"
                    : "arrow_forward_ios"
                }
              >
                {PREPARE_FORM_STEPS.length === currentStep
                  ? "Generar documento"
                  : "Siguiente"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
