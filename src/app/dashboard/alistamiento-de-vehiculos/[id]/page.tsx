"use client";
import { useEffect, useState } from "react";
import { fetchRequest } from "@ncl/app/shared";
import { PrepareDocument } from "@ncl/app/shared/models";
import { useUser } from "@ncl/app/context/user-context";
import Image from "next/image";
import MainInfo from "@ncl/app/dashboard/alistamiento-de-vehiculos/[id]/components/main-info";
import { CircularProgress } from "@mui/material";
import GridRowInfo from "@ncl/app/dashboard/alistamiento-de-vehiculos/[id]/components/grid-row-info";
import moment from "moment";

export default function Page({ params }: { params: { id: string } }) {
  const { user } = useUser();
  const [error, setError] = useState<string | null>("");
  const [errorData, setErrorData] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(true);
  const [document, setDocument] = useState<PrepareDocument | undefined>();

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      fetchRequest<PrepareDocument>(
        "/api/prepare-documents/get-document-by-id",
        {
          documentId: params.id,
          companyId: user?.id,
        },
      )
        .then((response) => {
          if (response?.success) {
            setDocument(response.result as PrepareDocument);
          } else {
            console.error(response?.error);
            setError(response.error);
          }
        })
        .catch((error) => {
          console.error(error);
          setError(error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  return document ? (
    <div className="document">
      <div className="document-grid">
        <div className="col-start-10 col-span-3 row-start-1 content-center document-item">
          <Image
            className="mx-auto"
            src="/logo.svg"
            alt="NCL Certificaciones Logo"
            width={80}
            height={24}
            priority
          />
        </div>
        <div className="col-start-4 col-span-6 row-start-1 content-center text-center document-item">
          <h6 className="font-bold text-base">
            Lista de Chequeo Alistamiento de vehículos
          </h6>
        </div>
        <div className="col-start-1 col-span-3 row-start-1 text-xs content-center document-item">
          <ul className="[&>li]:my-1">
            <li>
              <b>Version:</b> 1.0
            </li>
            <li>
              <b>Fecha:</b> 20 de Agosto del 2022
            </li>
            <li>
              <b>Código:</b> xxxx
            </li>
          </ul>
        </div>
      </div>
      <MainInfo document={document} />
      <GridRowInfo
        groupName="Documentos"
        items={[
          {
            label: "Licencia de Tránsito",
            description: "Verificar vigencia del documento",
            isValid: document.isLicenseTransitValid,
            observation: document.licenseTransitObs,
            image: document.licenseTransitImage,
          },
          {
            label: "SOAT",
            description: "Verificar vigencia del documento",
            isValid: document.isSOATValid,
            observation: document.SOATObs,
            image: document.SOATImage,
          },
          {
            label: "RTM y EC",
            description: "Verificar vigencia del documento",
            isValid: document.isRTMAndECValid,
            observation: document.RTMAndECObs,
            image: document.RTMAndECImage,
          },
          {
            label: "Póliza RCE y RCC",
            description: "Verificar vigencia del documento",
            isValid: document.isPolicyRCEAndRCCValid,
            observation: document.policyRCEAndRCCObs,
            image: document.policyRCEAndRCCImage,
          },
          {
            label: "Tarjeta de operación",
            description: "Verificar vigencia del documento",
            isValid: document.isOperationCardValid,
            observation: document.operationCardObs,
            image: document.operationCardImage,
          },
          {
            label: "Licencia de conducción",
            description: "Verificar vigencia del documento",
            isValid: document.isDriverLicenseValid,
            observation: document.driverLicenseObs,
            image: document.driverLicenseImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Motor"
        items={[
          {
            label: "Fugas de motor",
            description: "Verificar fugas niveles",
            isValid: document.isEngineLeaksValid,
            observation: document.engineLeaksObs,
            image: document.engineLeaksImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Correas"
        items={[
          {
            label: "Tensión",
            description: "Verificar tensión de correas",
            isValid: document.isBeltTensionValid,
            observation: document.beltTensionObs,
            image: document.beltTensionImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Tapas"
        items={[
          {
            label: "Tapas de combustible",
            description: "Verificar estado y funcionamiento",
            isValid: document.isFuelCapsValid,
            observation: document.fuelCapsObs,
            image: document.fuelCapsImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Transmisión de potencia"
        items={[
          {
            label: "Embrague, caja, diferencial",
            description: "Verificar estado y funcionamiento",
            isValid: document.isTransmissionStatusValid,
            observation: document.transmissionStatusObs,
            image: document.transmissionStatusImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Batería"
        items={[
          {
            label: "Estado de la batería",
            description: "Verificar estado y funcionamiento",
            isValid: document.isBatteryStatusValid,
            observation: document.batteryStatusObs,
            image: document.batteryStatusImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Direccionales"
        items={[
          {
            label: "Delanteras",
            description: "Verificar funcionamiento",
            isValid: document.isFrontTurnSignalsValid,
            observation: document.frontTurnSignalsObs,
            image: document.frontTurnSignalsImage,
          },
          {
            label: "Traseras",
            description: "Verificar funcionamiento",
            isValid: document.isRearTurnSignalsValid,
            observation: document.rearTurnSignalsObs,
            image: document.rearTurnSignalsImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Luces"
        items={[
          {
            label: "Altas",
            description: "Verificar funcionamiento",
            isValid: document.isHighLightsValid,
            observation: document.highLightsObs,
            image: document.highLightsImage,
          },
          {
            label: "Bajas",
            description: "Verificar funcionamiento",
            isValid: document.isLowLightsValid,
            observation: document.lowLightsObs,
            image: document.lowLightsImage,
          },
          {
            label: "Stops",
            description: "Verificar funcionamiento",
            isValid: document.isStopsValid,
            observation: document.stopsObs,
            image: document.stopsImage,
          },
          {
            label: "Reversa",
            description: "Verificar funcionamiento",
            isValid: document.isReverseLightValid,
            observation: document.reverseLightObs,
            image: document.reverseLightImage,
          },
          {
            label: "Parqueo",
            description: "Verificar funcionamiento",
            isValid: document.isParkingLightsValid,
            observation: document.parkingLightsObs,
            image: document.parkingLightsImage,
          },
          {
            label: "Tablero",
            description: "Verificar funcionamiento",
            isValid: document.isDashboardLightsValid,
            observation: document.dashboardLightsObs,
            image: document.dashboardLightsImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Suspensión y direccción"
        items={[
          {
            label: "Inspec.sensorial",
            description: "Verificar estado de la suspensión",
            isValid: document.isSuspensionStatusValid,
            observation: document.suspensionStatusObs,
            image: document.suspensionStatusImage,
          },
          {
            label: "Inspec.sensorial",
            description: "Verificar estado de la dirección",
            isValid: document.isPowerSteeringStatusValid,
            observation: document.powerSteeringStatusObs,
            image: document.powerSteeringStatusImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Limpiaparabrisas"
        items={[
          {
            label: "DER/IZQ/TRASERO",
            description: "Plumillas en buen estado, aditivos, agua, shampoo",
            isValid: document.isWiperStatusValid,
            observation: document.wiperStatusObs,
            image: document.wiperStatusImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Frenos"
        items={[
          {
            label: "Principales",
            description: "Verificar estado",
            isValid: document.isMainBrakesStatusValid,
            observation: document.mainBrakesStatusObs,
            image: document.mainBrakesStatusImage,
          },
          {
            label: "Emergencia",
            description: "Verificar estado",
            isValid: document.isEmergencyBrakesStatusValid,
            observation: document.emergencyBrakesStatusObs,
            image: document.emergencyBrakesStatusImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Llantas"
        items={[
          {
            label: "Delanteras",
            description: "Verificar estado, profundidad del labrado y presión",
            isValid: document.isFrontTyresStatusValid,
            observation: document.frontTyresStatusObs,
            image: document.frontTyresStatusImage,
          },
          {
            label: "Traseras",
            description: "Verificar estado, profundidad del labrado y presión",
            isValid: document.isRearTyresStatusValid,
            observation: document.rearTyresStatusObs,
            image: document.rearTyresStatusImage,
          },
          {
            label: "Repuesto",
            description: "Verificar estado, profundidad del labrado y presión",
            isValid: document.isSpareTyreStatusValid,
            observation: document.spareTyreStatusObs,
            image: document.spareTyreStatusImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Espejos"
        items={[
          {
            label: "Laterales IZQ/DER",
            description: "Verificar estado de limpieza sin daños y ubicación",
            isValid: document.isSideMirrorsStatusValid,
            observation: document.sideMirrorsStatusObs,
            image: document.sideMirrorsStatusImage,
          },
          {
            label: "Retrovisor",
            description: "Verificar estado de limpieza sin daños y ubicación",
            isValid: document.isRearviewStatusValid,
            observation: document.rearviewStatusObs,
            image: document.rearviewStatusImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Salidas de emergencia, puertas"
        items={[
          {
            label: "Según carrocería",
            description: "Verificar martillos, señales, cantidad y  apertura",
            isValid: document.isEmergencyExitValid,
            observation: document.emergencyExitObs,
            image: document.emergencyExitImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Pito"
        items={[
          {
            label: "Funcional",
            description: "Sensorial",
            isValid: document.isHornValid,
            observation: document.hornObs,
            image: document.hornImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Niveles de fluido"
        items={[
          {
            label: "Sistema frenos",
            description: "Verificar los niveles, fugas, drenaje, sensorial",
            isValid: document.isFluidLevelBrakesValid,
            observation: document.fluidLevelBrakesObs,
            image: document.fluidLevelBrakesImage,
          },
          {
            label: "Aceite",
            description: "Verificar los niveles, fugas, drenaje, sensorial",
            isValid: document.isFluidLevelOilValid,
            observation: document.fluidLevelOilObs,
            image: document.fluidLevelOilImage,
          },
          {
            label: "Refrigerante",
            description: "Verificar los niveles, fugas, drenaje, sensorial",
            isValid: document.isFluidLevelRefrigerantValid,
            observation: document.fluidLevelRefrigerantObs,
            image: document.fluidLevelRefrigerantImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Filtros húmedos y secos"
        items={[
          {
            label: "Presencia",
            description: "Verificar estado",
            isValid: document.isDryAndWetFiltersValid,
            observation: document.dryAndWetFiltersObs,
            image: document.dryAndWetFiltersImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Seguridad pasiva"
        items={[
          {
            label: "Cinturones, sillas, apoyacabezas",
            description: "Sensorial",
            isValid: document?.isPassiveSafetyValid,
            observation: document.passiveSafetyObs,
            image: document.passiveSafetyImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Última fecha de mantenimiento"
        items={[
          {
            label: "Cambio de aceite",
            description: moment(
              document.lastOilChangeDate,
              "YYYY-MM-DD",
            ).format("DD/MM/YYYY"),
            isValid: document?.isLastOilChangeValid,
            observation: document?.lastOilChangeObs,
            image: document.lastOilChangeImage,
          },
          {
            label: "Aseo",
            description: moment(document?.lastCleanDate, "YYYY-MM-DD").format(
              "DD/MM/YYYY",
            ),
            isValid: document?.isLastCleanValid,
            observation: document?.lastCleanObs,
            image: document?.lastCleanImage,
          },
          {
            label: "Alineación/Balanceo",
            description: moment(
              document?.lastAlignmentBalanceDate,
              "YYYY-MM-DD",
            ).format("DD/MM/YYYY"),
            isValid: document?.isLastAlignmentBalanceValid,
            observation: document?.lastAlignmentBalanceObs,
            image: document?.lastAlignmentBalanceImage,
          },
          {
            label: "Sincronización",
            description: moment(document?.lastSyncDate, "YYYY-MM-DD").format(
              "DD/MM/YYYY",
            ),
            isValid: document?.isLastSyncValid,
            observation: document?.lastSyncObs,
            image: document?.lastSyncImage,
          },
          {
            label: "Cambio de llantas",
            description: moment(
              document?.lastTyreChangesDate,
              "YYYY-MM-DD",
            ).format("DD/MM/YYYY"),
            isValid: document?.isLastTyreChangesValid,
            observation: document?.lastTyreChangesObs,
            image: document?.lastTyreChangesImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Extintor"
        items={[
          {
            label: "Fecha de vencimiento",
            description: "Anillo, seguros, manómetro",
            isValid: document?.isExtinguisherValid,
            observation: document.extinguisherObs,
            image: document.extinguisherImage,
          },
          {
            label: "Capacidad",
            description: "Libras",
            isValid: document?.isExtinguisherSizeValid,
            observation: document?.extinguisherSizeObs,
            image: document.extinguisherSizeImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Herramientas"
        items={[
          {
            label: "Alicates",
            description: "Presencia y estado",
            isValid: document?.isPliersValid,
            observation: document?.pliersObs,
            image: document?.pliersImage,
          },
          {
            label: "Destornilladores",
            description: "Presencia y estado",
            isValid: document?.isScrewdriversValid,
            observation: document?.screwdriversObs,
            image: document.screwdriversImage,
          },
          {
            label: "Llaves de expansión y fijas",
            description: "Presencia y estado",
            isValid: document?.isWrenchValid,
            observation: document?.wrenchObs,
            image: document?.wrenchImage,
          },
          {
            label: "Cruceta",
            description: "Presencia y estado",
            isValid: document?.isCrossPieceValid,
            observation: document?.crossPieceObs,
            image: document.crossPieceImage,
          },
          {
            label: "Gato",
            description: "Presencia y estado",
            isValid: document?.isJackValid,
            observation: document?.jackObs,
            image: document?.jackImage,
          },
          {
            label: "Taco",
            description: "Presencia y estado",
            isValid: document?.isTyreShockValid,
            observation: document?.tyreShockObs,
            image: document.tyreShockImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Señales"
        items={[
          {
            label: "Reflectivas y conos",
            description: "Cintas, conos y seguridad",
            isValid: document?.isWarningSignsValid,
            observation: document?.warningSignsObs,
            image: document?.warningSignsImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Chaleco"
        items={[
          {
            label: "Estado",
            description: "Reflectivo",
            isValid: document?.isSafetyVestsValid,
            observation: document?.safetyVestsObs,
            image: document?.safetyVestsImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Botiquin"
        items={[
          {
            label: "Estado/vencimiento",
            description: "Gasas, curas, algodón, micropore, guantes, jabón",
            isValid: document?.isFirstAidKitValid,
            observation: document?.firstAidKitObs,
            image: document?.firstAidKitImage,
          },
        ]}
      />
      <GridRowInfo
        groupName="Residuos"
        items={[
          {
            label: "Baterías, aceites, lodos",
            description: "Normativa ambiental",
            isValid: document?.isWasteValid,
            observation: document?.wasteObs,
            image: document?.wasteImage,
          },
        ]}
      />
    </div>
  ) : (
    <CircularProgress />
  );
}
