import * as Yup from 'yup';

export const ContactUsSchema = Yup.object().shape({
  firstName: Yup.string().min(1).required('Please provide your firstName'),
  lastName: Yup.string().min(1).required('Please provide your lastName'),
  email: Yup.string().email().required('Please provide your email'),
  message: Yup.string().min(1),
});

export type ContactUsDataType = Yup.InferType<typeof ContactUsSchema>;

type InitialValues = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export const contactUsInitialValues: InitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};
