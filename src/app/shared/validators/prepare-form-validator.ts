import * as Yup from "yup";
import { FORM_ERROR_MESSAGE } from "@ncl/app/shared";

export const prepareFormValidator = Yup.object().shape({
  internalNumber: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  companyId: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  companyName: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  companyCity: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  preparerName: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  driverName: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isLicenseTransitValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isPrevRevisionValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isSOATValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isRTMAndECValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isPolicyRCEAndRCCValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isOperationCardValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isDriverLicenseValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isEngineLeaksValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isBeltTensionValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isFuelCapsValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isTransmissionStatusValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isBatteryStatusValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isFrontTurnSignalsValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isRearTurnSignalsValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isHighLightsValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isLowLightsValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isStopsValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isReverseLightValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isParkingLightsValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isDashboardLightsValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isSuspensionStatusValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isPowerSteeringStatusValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isWiperStatusValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isMainBrakesStatusValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isEmergencyBrakesStatusValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isFrontTyresStatusValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isRearTyresStatusValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isSpareTyreStatusValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isSideMirrorsStatusValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isRearviewStatusValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isEmergencyExitValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isHornValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isFluidLevelBrakesValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isFluidLevelOilValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isFluidLevelRefrigerantValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isDryAndWetFiltersValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isPassiveSafetyValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  lastOilChangeDate: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isLastOilChangeValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  lastCleanDate: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isLastCleanValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  lastAlignmentBalanceDate: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isLastAlignmentBalanceValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  lastSyncDate: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isLastSyncValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  lastTyreChangesDate: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isLastTyreChangesValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isExtinguisherValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isExtinguisherSizeValid: Yup.string().required(
    FORM_ERROR_MESSAGE.FIELD_REQUIRED,
  ),
  isPliersValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isScrewdriversValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isWrenchValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isCrossPieceValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isJackValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isTyreShockValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isWarningSignsValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isSafetyVestsValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isFirstAidKitValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  isWasteValid: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
});
