import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().min(2).required('firstname is required'),
  lastName: Yup.string().min(2).required('Lastname is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().min(8).required('Please provide a your password'),
  isTermsAccepted: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});

export type SignUpDataType = Yup.InferType<typeof SignUpSchema>;

type InitialValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isTermsAccepted: boolean;
};

export const signUpInitialValues: InitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isTermsAccepted: false,
};

export interface ISignupData {
  userId?: string;
  base64Secret?: string;
  password: string;
}

export interface Signupdata {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isTermsAccepted:boolean;
}
