import * as Yup from 'yup';

export const signUpPaswordChangeSchema = Yup.object().shape({
  password: Yup.string().min(8).required('Please provide a your password'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

export type signUpPaswordChangeDataType = Yup.InferType<
  typeof signUpPaswordChangeSchema
>;

type InitialValues = {
  password: string;
  confirmPassword: string;
};

export const signUpPaswordChangeInitialValues: InitialValues = {
  password: '',
  confirmPassword: '',
};

export interface ISigupPasswordChange {
  userId: string;
  password: string;
}
