import * as Yup from 'yup';

export const ExperienceSchema = Yup.object().shape({
  title: Yup.string().required('Please enter a title'),
  qualificationCertificate: Yup.mixed()
    .nullable() // Allow null values
    .test('fileFormat', 'Unsupported file format', (value) => {
      if (!value) return true; // Allow null values
      return value && value instanceof Blob; // Ensure it's a file if provided
    }),
  companyName: Yup.string().required('Enter a company name'),
  otherQualification: Yup.string().nullable(),
  employmentType: Yup.string().required('Please select type'),
  yearOfQualification: Yup.date(),
  location: Yup.string().required('Please enter your location'),
  startDate: Yup.string().required('Enter start date'),
  endDate: Yup.string().required('End start date'),
  // id: Yup.string(),
});

export type ExperienceDataType = Yup.InferType<typeof ExperienceSchema>;

type InitialValues = {
  title: string;
  qualificationCertificate?: any;
  companyName: string;
  otherQualification?: string;
  employmentType?: string;
  yearOfQualification: string;
  location: string;
  startDate: string;
  endDate: string;
  // id?: string;
};

export const experienceInitialValues: InitialValues = {
  title: '',
  qualificationCertificate: null,
  companyName: '',
  otherQualification: '',
  employmentType: '',
  yearOfQualification: '',
  location: '',
  startDate: '',
  endDate: '',
  // id: "",
};
