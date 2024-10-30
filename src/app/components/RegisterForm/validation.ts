import * as Yup from 'yup';

import { EMAIL_REGEXP, PASSWORD_REGEXP } from '@/app/ustils/constants';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Required')
    .matches(EMAIL_REGEXP, 'Email is invalid')
    .email('Invalid email address'),
  password: Yup.string().required('Required').matches(PASSWORD_REGEXP, 'Password is invalid'),
});

export default validationSchema;
