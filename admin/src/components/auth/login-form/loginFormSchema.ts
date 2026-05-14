import * as yup from 'yup';

export const loginFormSchema = yup.object().shape({
  email: yup.string().email('form:error-email-format').required('form:error-email-required'),
  password: yup.string().required('form:error-password-required'),
});
