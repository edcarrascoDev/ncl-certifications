import * as Yup from "yup";
import { FORM_ERROR_MESSAGE } from "@ncl/app/shared";

export const prepareFormValidator = Yup.object().shape({
  licensePlate: Yup.string()
    .transform((value) => value.toUpperCase())
    .matches(
      /^([A-Z]{3}\d{3}|[A-Z]{2}\d{4}|[A-Z]{3}\d{2}[A-Z])$/,
      FORM_ERROR_MESSAGE.PLATE_FORMAT,
    )
    .required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  internalNumber: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
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
});
