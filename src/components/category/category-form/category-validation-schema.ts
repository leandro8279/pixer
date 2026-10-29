import * as yup from 'yup';

export const categoryValidationSchema = yup.object().shape({
  name: yup.string().required('error-name-required'),
  // type: yup.object().nullable().required('form:error-type-required'),
});
