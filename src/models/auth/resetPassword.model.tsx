import * as Yup from 'yup';

export const ResetPaswdSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
});

export type ResetPaswdDataType = Yup.InferType<typeof ResetPaswdSchema>;

type InitialValues = {
  email: string;
};

export const resetPasswordInitialValues: InitialValues = {
  email: '',
};

export interface IPasswordReset {
  email: string;
}
