import * as Yup from 'yup';

export const LocumSignInSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().min(8).required('Please provide a your password'),
});

export type LocumSignInDataType = Yup.InferType<typeof LocumSignInSchema>;

type InitialValues = {
  email: string;
  password: string;
};

export const locumSigninInitialValues: InitialValues = {
  email: '',
  password: '',
};

interface IVerification {
  id: string;
  yearOfCurrentLicense: string;
  license: string;
  primaryDegreeName: string;
  primaryDegreeCertificate: string;
  validationNumber: string;
  status: string;
  updatedAt: string;
  createdAt: string;
}

interface IExperiences {
  title: string;
  companyName: string;
  employmentType: string;
  location: string;
  otherQualification: string;
  qualificationCertificate?: string | null;
  yearOfQualification: string;
  startDate: string;
  endDate: string;
  id: string;
}

interface IAuthCredentials {
  accessToken: string;
  refreshToken: string;
  accessTokenTtl: number;
}

export interface ILocumUserData {
  id: string;
  usersName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  birthday?: string | null;
  state?: string | null;
  country?: string | null;
  yearsOfExperience: number;
  occupation?: string | null;
  bio?: string | null;
  profileImage?: string | null;
  isVerified: boolean;
  verification?: IVerification | null;
  experiences: IExperiences[] | [];
  updatedAt: string;
  createdAt: string;
  authCredentials: IAuthCredentials;
}

// export interface ILocumSignInData {
//   user: ILocumUserData;
//   token: string;
// }
