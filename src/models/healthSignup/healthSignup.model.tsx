import * as Yup from 'yup';

export const HealthSignUpSchema = Yup.object().shape({
  institutionName: Yup.string().required('Institution name is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  streetAddress: Yup.string().required('Street address is required'),
  localGovernment: Yup.string().required('Local government is required'),
  serviceIndustry: Yup.string().required('Service industry is required'),
  agreeToTerms: Yup.boolean().oneOf(
    [true],
    'You must agree to the terms and conditions'
  ),
});

export type HealthSignUpDataType = Yup.InferType<typeof HealthSignUpSchema>;

type InitialValues = {
  institutionName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  state: string;
  city: string;
  streetAddress: string;
  localGovernment: string;
  serviceIndustry: string;
  agreeToTerms: false;
};

export const healthSignUpInitialValues: InitialValues = {
  institutionName: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  state: '',
  city: '',
  streetAddress: '',
  localGovernment: '',
  serviceIndustry: '',
  agreeToTerms: false,
};
