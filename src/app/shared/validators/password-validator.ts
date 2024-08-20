import * as Yup from "yup";
import { FORM_ERROR_MESSAGE } from "@ncl/app/shared";
import { UserData } from "@ncl/app/shared/models";

export const passwordValidator = (userData?: UserData) =>
  Yup.object().shape({
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
