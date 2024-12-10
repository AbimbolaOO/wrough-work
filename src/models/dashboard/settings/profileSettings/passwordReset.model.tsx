import * as Yup from 'yup';

export const ResetSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  password: Yup.string().oneOf(
    [Yup.ref('newPassword')],
    'Passwords must match'
  ),
});

export type ResetDataType = Yup.InferType<typeof ResetSchema>;

type InitialValues = {
  oldPassword: string;
  newPassword: string;
  password: string;
};

export const ResetInitialValues: InitialValues = {
  oldPassword: '',
  newPassword: '',
  password: '',
};
