import { ImageData } from "@ncl/app/shared/types";
import { StandardDocumentData } from "@ncl/app/shared/models/standard-document.data";

export interface PrepareDocument
  extends StandardDocumentData,
    PrepareDocs,
    PrepareEngine,
    PrepareBelt,
    PrepareFuelTaps,
    PrepareTransmission,
    PrepareBattery,
    PrepareTurnSignals,
    PrepareLights,
    PrepareSuspensionAndPowerSteering,
    PrepareWiper,
    PrepareBrakes,
    PrepareTyres,
    PrepareMirrors,
    PrepareEmergencyExit,
    PrepareHorn,
    PrepareFluids,
    PrepareDryAndWetFilters,
    PreparePassiveSafety,
    PrepareLastMaintenance,
    PrepareExtinguisher,
    PrepareTools,
    PrepareSigns,
    SafetyVets,
    PrepareSafetyVets,
    PrepareWaste {
  licensePlate: string;
  internalNumber: string;
  companyId: string;
  companyName: string;
  companyCity: string;
  companyDepartment: string;
  preparerName: string;
  preparerID: string;
  driverName: string;
}

export interface PrepareDocs {
  isLicenseTransitValid: string | boolean;
  licenseTransitObs?: string;
  licenseTransitImage?: ImageData;
  isSOATValid: string;
  SOATObs?: string;
  SOATImage?: ImageData;
  isPrevRevisionValid: string;
  prevRevisionObs?: string;
  prevRevisionImage?: ImageData;
  isRTMAndECValid: string;
  RTMAndECObs?: string;
  RTMAndECImage?: ImageData;
  isPolicyRCEAndRCCValid: string;
  policyRCEAndRCCObs?: string;
  policyRCEAndRCCImage?: ImageData;
  isOperationCardValid: string;
  operationCardObs?: string;
  operationCardImage?: ImageData;
  isDriverLicenseValid: string;
  driverLicenseObs?: string;
  driverLicenseImage?: ImageData;
}

export interface PrepareEngine {
  isEngineLeaksValid: string;
  engineLeaksObs?: string;
  engineLeaksImage?: ImageData;
}

export interface PrepareBelt {
  isBeltTensionValid: string;
  beltTensionObs?: string;
  beltTensionImage?: ImageData;
}

export interface PrepareFuelTaps {
  isFuelCapsValid: string;
  fuelCapsObs?: string;
  fuelCapsImage?: ImageData;
}

export interface PrepareTransmission {
  isTransmissionStatusValid: string;
  transmissionStatusObs?: string;
  transmissionStatusImage?: ImageData;
}

export interface PrepareBattery {
  isBatteryStatusValid: string;
  batteryStatusObs?: string;
  batteryStatusImage?: ImageData;
}

export interface PrepareTurnSignals {
  isFrontTurnSignalsValid: string;
  frontTurnSignalsObs?: string;
  frontTurnSignalsImage?: ImageData;
  isRearTurnSignalsValid: string;
  rearTurnSignalsObs?: string;
  rearTurnSignalsImage?: ImageData;
}

export interface PrepareLights {
  isHighLightsValid: string;
  highLightsObs?: string;
  highLightsImage?: ImageData;
  isLowLightsValid: string;
  lowLightsObs?: string;
  lowLightsImage?: ImageData;
  isStopsValid: string;
  stopsObs?: string;
  stopsImage?: ImageData;
  isReverseLightValid: string;
  reverseLightObs?: string;
  reverseLightImage?: ImageData;
  isParkingLightsValid: string;
  parkingLightsObs?: string;
  parkingLightsImage?: ImageData;
  isDashboardLightsValid: string;
  dashboardLightsObs?: string;
  dashboardLightsImage?: ImageData;
}

export interface PrepareSuspensionAndPowerSteering {
  isSuspensionStatusValid: string;
  suspensionStatusObs?: string;
  suspensionStatusImage?: ImageData;
  isPowerSteeringStatusValid: string;
  powerSteeringStatusObs?: string;
  powerSteeringStatusImage?: ImageData;
}

export interface PrepareWiper {
  isWiperStatusValid: string;
  wiperStatusObs?: string;
  wiperStatusImage?: ImageData;
}

export interface PrepareBrakes {
  isMainBrakesStatusValid: string;
  mainBrakesStatusObs?: string;
  mainBrakesStatusImage?: ImageData;
  isEmergencyBrakesStatusValid: string;
  emergencyBrakesStatusObs?: string;
  emergencyBrakesStatusImage?: ImageData;
}

export interface PrepareTyres {
  isFrontTyresStatusValid: string;
  frontTyresStatusObs?: string;
  frontTyresStatusImage?: ImageData;
  isRearTyresStatusValid: string;
  rearTyresStatusObs?: string;
  rearTyresStatusImage?: ImageData;
  isSpareTyreStatusValid: string;
  spareTyreStatusObs?: string;
  spareTyreStatusImage?: ImageData;
}

export interface PrepareMirrors {
  isSideMirrorsStatusValid: string;
  sideMirrorsStatusObs?: string;
  sideMirrorsStatusImage?: ImageData;
  isRearviewStatusValid: string;
  rearviewStatusObs?: string;
  rearviewStatusImage?: ImageData;
}
export interface PrepareEmergencyExit {
  isEmergencyExitValid: string;
  emergencyExitObs?: string;
  emergencyExitImage?: ImageData;
}

export interface PrepareHorn {
  isHornValid: string;
  hornObs?: string;
  hornImage?: ImageData;
}

export interface PrepareFluids {
  isFluidLevelBrakesValid: string;
  fluidLevelBrakesObs?: string;
  fluidLevelBrakesImage?: ImageData;
  isFluidLevelOilValid: string;
  fluidLevelOilObs?: string;
  fluidLevelOilImage?: ImageData;
  isFluidLevelRefrigerantValid: string;
  fluidLevelRefrigerantObs?: string;
  fluidLevelRefrigerantImage?: ImageData;
}

export interface PrepareDryAndWetFilters {
  isDryAndWetFiltersValid: string;
  dryAndWetFiltersObs?: string;
  dryAndWetFiltersImage?: ImageData;
}

export interface PreparePassiveSafety {
  isPassiveSafetyValid: string;
  passiveSafetyObs?: string;
  passiveSafetyImage?: ImageData;
}

export interface PrepareLastMaintenance {
  lastOilChangeDate: string;
  isLastOilChangeValid: string;
  lastOilChangeObs?: string;
  lastOilChangeImage?: ImageData;
  lastCleanDate: string;
  isLastCleanValid: string;
  lastCleanObs?: string;
  lastCleanImage?: ImageData;
  lastAlignmentBalanceDate: string;
  isLastAlignmentBalanceValid: string;
  lastAlignmentBalanceObs?: string;
  lastAlignmentBalanceImage?: ImageData;
  lastSyncDate: string;
  isLastSyncValid: string;
  lastSyncObs?: string;
  lastSyncImage?: ImageData;
  lastTyreChangesDate: string;
  isLastTyreChangesValid: string;
  lastTyreChangesObs?: string;
  lastTyreChangesImage?: ImageData;
}

export interface PrepareExtinguisher {
  isExtinguisherValid: string;
  extinguisherObs?: string;
  extinguisherImage?: ImageData;
  isExtinguisherSizeValid: string;
  extinguisherSizeObs?: string;
  extinguisherSizeImage?: ImageData;
}

export interface PrepareTools {
  isPliersValid: string;
  pliersObs?: string;
  pliersImage?: ImageData;
  isScrewdriversValid: string;
  screwdriversObs?: string;
  screwdriversImage?: ImageData;
  isWrenchValid: string;
  wrenchObs?: string;
  wrenchImage?: ImageData;
  isCrossPieceValid: string;
  crossPieceObs?: string;
  crossPieceImage?: ImageData;
  isJackValid: string;
  jackObs?: string;
  jackImage?: ImageData;
  isTyreShockValid: string;
  tyreShockObs?: string;
  tyreShockImage?: ImageData;
}

export interface PrepareSigns {
  isWarningSignsValid: string;
  warningSignsObs?: string;
  warningSignsImage?: ImageData;
}

export interface SafetyVets {
  isSafetyVestsValid: string;
  safetyVestsObs?: string;
  safetyVestsImage?: ImageData;
}

export interface PrepareSafetyVets {
  isFirstAidKitValid: string;
  firstAidKitObs?: string;
  firstAidKitImage?: ImageData;
}

export interface PrepareWaste {
  isWasteValid: string;
  wasteObs?: string;
  wasteImage?: ImageData;
}
