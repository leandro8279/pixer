import * as yup from 'yup';

export const taxValidationSchema = yup.object().shape({
  name: yup.string().required('error-name-required'),
  rate: yup
    .number()
    .typeError('error-rate-must-number')
    .positive('error-rate-must-positive')
    .integer('error-rate-must-integer')
    .required('error-rate-required'),
});
