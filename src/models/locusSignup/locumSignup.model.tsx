import * as Yup from 'yup';

export const LocumSignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  agreeToTerms: Yup.boolean().oneOf(
    [true],
    'You must agree to the terms and conditions'
  ),
});

export type LocumSignUpDataType = Yup.InferType<typeof LocumSignUpSchema>;

type InitialValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agreeToTerms: false;
};

export const locumSignUpInitialValues: InitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  agreeToTerms: false,
};
