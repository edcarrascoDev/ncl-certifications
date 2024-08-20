import { UserData } from "@ncl/app/shared/models";
import * as Yup from "yup";
import { FORM_ERROR_MESSAGE } from "@ncl/app/shared";

export const userFormValidator = (userData?: UserData) =>
  Yup.object().shape({
    name: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    lastName: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    phone: Yup.string()
      .matches(/^\d{10}$/, FORM_ERROR_MESSAGE.PHONE_INVALID)
      .required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    email: Yup.string()
      .email(FORM_ERROR_MESSAGE.EMAIL_INVALID)
      .required(FORM_ERROR_MESSAGE.EMAIL_REQUIRED),
    companyId: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    role: Yup.string().required(FORM_ERROR_MESSAGE.FIELD_REQUIRED),
    password: userData
      ? Yup.string().min(8, FORM_ERROR_MESSAGE.PASSWORD_MIN).notRequired()
      : Yup.string()
          .min(8, FORM_ERROR_MESSAGE.PASSWORD_MIN)
          .required(FORM_ERROR_MESSAGE.PASSWORD_REQUIRED),
    confirmPassword: userData
      ? Yup.string().oneOf(
          [Yup.ref("password")],
          FORM_ERROR_MESSAGE.PASSWORD_DIFFERENT,
        )
      : Yup.string()
          .oneOf([Yup.ref("password")], FORM_ERROR_MESSAGE.PASSWORD_DIFFERENT)
          .required(FORM_ERROR_MESSAGE.PASSWORD_REQUIRED),
  });
