import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
  email: yup.string().email("error-email-format").required("error-email-required"),
  password: yup.string().required("error-password-required"),
});
