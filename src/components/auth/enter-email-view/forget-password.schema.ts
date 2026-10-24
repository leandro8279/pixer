import * as yup from "yup";

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("error-email-format").required("error-email-required"),
});
