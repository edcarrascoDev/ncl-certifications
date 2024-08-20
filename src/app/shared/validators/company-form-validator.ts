import * as Yup from "yup";
import { FORM_ERROR_MESSAGE } from "@ncl/app/shared";

export const companyFormValidator = Yup.object().shape({
  name: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  documentIdType: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  documentId: Yup.string()
    .matches(/^[0-9]+$/, FORM_ERROR_MESSAGE.NUMBER_INVALID)
    .required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  phone: Yup.string()
    .matches(/^\d{10}$/, FORM_ERROR_MESSAGE.PHONE_INVALID)
    .required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  email: Yup.string()
    .email(FORM_ERROR_MESSAGE.EMAIL_INVALID)
    .required(FORM_ERROR_MESSAGE.EMAIL_REQUIRED),
  address: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  city: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
  department: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
});
