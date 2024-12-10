import * as Yup from 'yup';

// import { ExperienceSchema } from './experience.model';
// import { VerificationSchema } from './verification.model';

export const BasicInfoSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  occupation: Yup.string().required('Occupation is required'),
  birthday: Yup.date().required('Please select your date of birth'),
  phone: Yup.string().required('Please enter phone number'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Please enter your country of residence'),
  yearsOfExperience: Yup.string().required('Enter years of experience'),
  bio: Yup.string().required('Write short note about yourself'),
  // profileImage: Yup.string().nullable(),
  // verification: VerificationSchema.optional().nullable(),
  // experiences: ExperienceSchema.optional().nullable(),
});

export type BasicInfoDataType = Yup.InferType<typeof BasicInfoSchema>;

type InitialValues = {
  firstName: string;
  lastName: string;
  occupation: string;
  birthday: string;
  phone: string;
  email: string;
  state: string;
  country: string;
  yearsOfExperience: string;
  bio: string;
  // profileImage: string;
};

export const basicInfoInitialValues: InitialValues = {
  firstName: '',
  lastName: '',
  occupation: '',
  birthday: '',
  phone: '',
  email: '',
  state: '',
  country: '',
  yearsOfExperience: '',
  bio: '',
  // profileImage: '',
};
