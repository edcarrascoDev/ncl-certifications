export interface PrepareFormRequest {
  licensePlate: string;
  internalNumber: string;
  companyName: string;
  companyCity: string;
  preparerName: string;
  preparerID: string;
  driverName: string;
  isLicenseTransitValid: string;
  licenseTransitObs?: string;
  licenseTransitFile?: File | null;
  isSOATValid: string;
  SOATObs?: string;
  SOATFile?: File | null;
  isPrevRevisionValid: string;
  prevRevisionObs?: string;
  prevRevisionFile?: File | null;
  isRTMAndECValid: string;
  RTMAndECObs?: string;
  RTMAndECFile?: File | null;
  isPolicyRCEAndRCCValid: string;
  policyRCEAndRCCObs?: string;
  policyRCEAndRCCFile?: File | null;
  isOperationCardValid: string;
  operationCardObs?: string;
  operationCardFile?: File | null;
  isDriverLicenseValid: string;
  driverLicenseObs?: string;
  driverLicenseFile?: File | null;
  isEngineLeaksValid: string;
  engineLeaksObs?: string;
  engineLeaksFile?: File | null;
  isBeltTensionValid: string;
  beltTensionObs?: string;
  beltTensionFile?: File | null;
  isFuelCapsValid: string;
  fuelCapsObs?: string;
  fuelCapsFile?: File | null;
  isTransmissionStatusValid: string;
  transmissionStatusObs?: string;
  transmissionStatusFile?: File | null;
  isBatteryStatusValid: string;
  batteryStatusObs?: string;
  batteryStatusFile?: File | null;
  isFrontTurnSignalsValid: string;
  frontTurnSignalsObs?: string;
  frontTurnSignalsFile?: File | null;
  isRearTurnSignalsValid: string;
  rearTurnSignalsObs?: string;
  rearTurnSignalsFile?: File | null;
  isHighLightsValid: string;
  highLightsObs?: string;
  highLightsFile?: File | null;
  isLowLightsValid: string;
  lowLightsObs?: string;
  lowLightsFile?: File | null;
  isStopsValid: string;
  stopsObs?: string;
  stopsFile?: File | null;
  isReverseLightValid: string;
  reverseLightObs?: string;
  reverseLightFile?: File | null;
  isParkingLightsValid: string;
  parkingLightsObs?: string;
  parkingLightsFile?: File | null;
  isDashboardLightsValid: string;
  dashboardLightsObs?: string;
  dashboardLightsFile?: File | null;
  isSuspensionStatusValid: string;
  suspensionStatusObs?: string;
  suspensionStatusFile?: File | null;
  isWiperStatusValid: string;
  wiperStatusObs?: string;
  wiperStatusFile?: File | null;
  isMainBrakesStatusValid: string;
  mainBrakesStatusObs?: string;
  mainBrakesStatusFile?: File | null;
  isEmergencyBrakesStatusValid: string;
  emergencyBrakesStatusObs?: string;
  emergencyBrakesStatusFile?: File | null;
  isFrontTyresStatusValid: string;
  frontTyresStatusObs?: string;
  frontTyresStatusFile?: File | null;
  isRearTyresStatusValid: string;
  rearTyresStatusObs?: string;
  rearTyresStatusFile?: File | null;
  isSpareTyreStatusValid: string;
  spareTyreStatusObs?: string;
  spareTyreStatusFile?: File | null;
  isSideMirrorsStatusValid: string;
  sideMirrorsStatusObs?: string;
  sideMirrorsStatusFile?: File | null;
  isRearviewStatusValid: string;
  rearviewStatusObs?: string;
  rearviewStatusFile?: File | null;
}
