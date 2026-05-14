import { Permission } from '@/types';

import * as yup from 'yup';

export const registrationFormSchema = yup.object().shape({
  name: yup.string().required('form:error-name-required'),
  email: yup.string().email('form:error-email-format').required('form:error-email-required'),
  password: yup.string().required('form:error-password-required'),
  permission: yup.mixed<Permission>().oneOf([Permission.StoreOwner]).default(Permission.StoreOwner).required(),
});
