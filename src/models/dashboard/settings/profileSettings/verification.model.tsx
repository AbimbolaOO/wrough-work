import * as Yup from 'yup';

export const VerificationSchema = Yup.object().shape({
  yearOfCurrentLicense: Yup.date().required(
    'Enter the year of your current license'
  ),
  license: Yup.mixed()
    .required('Upload your license')
    .test(
      'fileFormat',
      'Unsupported file format',
      (value) => value && value instanceof Blob
    ),
  primaryDegreeName: Yup.string().required('Enter degree name'),
  validationNumber: Yup.string().required('Enter validation number'),
  primaryDegreeCertificate: Yup.mixed()
    .required('Please upload degree certificate')
    .test(
      'fileFormat',
      'Unsupported file format',
      (value) => value && value instanceof Blob
    ),
  // status: Yup.string(),
  // id: Yup.string().optional().nullable(),
});

export type VerificationDataType = Yup.InferType<typeof VerificationSchema>;

type InitialValues = {
  yearOfCurrentLicense: Date | null;
  license: any;
  primaryDegreeName: string;
  validationNumber: string;
  primaryDegreeCertificate: any;
  // status?: string;
};

export const verificationInitialValues: InitialValues = {
  yearOfCurrentLicense: null,
  license: null,
  primaryDegreeName: '',
  validationNumber: '',
  primaryDegreeCertificate: null,
  // status: "",
};
