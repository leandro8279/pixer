import * as yup from 'yup';

export const tagValidationSchema = yup.object().shape({
  name: yup.string().required('error-name-required'),
});
