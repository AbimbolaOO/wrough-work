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
      (value) => value && value instanceof File // Ensures the value is a File
    )
    .test(
      'fileSize',
      'File size must not exceed 3MB',
      (value) => value && value instanceof File && value.size <= 3 * 1024 * 1024 // Type narrowed to File
    ),
  primaryDegreeName: Yup.string().required('Enter degree name'),
  validationNumber: Yup.string().required('Enter validation number'),

  primaryDegreeCertificate: Yup.mixed()
    .required('Upload your certificate')
    .test(
      'fileFormat',
      'Unsupported file format',
      (value) => value && value instanceof File // Ensures the value is a File
    )
    .test(
      'fileSize',
      'File size must not exceed 3MB',
      (value) => value && value instanceof File && value.size <= 3 * 1024 * 1024 // Type narrowed to File
    ),
  // status: Yup.string(),
  // id: Yup.string().optional().nullable(),
});

export type VerificationDataType = Yup.InferType<typeof VerificationSchema>;

type InitialValues = {
  yearOfCurrentLicense: string;
  license: any;
  primaryDegreeName: string;
  validationNumber: string;
  primaryDegreeCertificate: any;
  // status?: string;
};

export const verificationInitialValues: InitialValues = {
  yearOfCurrentLicense: '',
  license: null,
  primaryDegreeName: '',
  validationNumber: '',
  primaryDegreeCertificate: null,
  // status: "",
};
