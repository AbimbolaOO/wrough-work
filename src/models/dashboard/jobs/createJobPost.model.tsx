import { isValid, parse } from 'date-fns';
import * as Yup from 'yup';

export const CreateJobPostSchema = Yup.object().shape({
  title: Yup.string().min(2).required('Please provide job title'),
  institutionName: Yup.string()
    .min(2)
    .required('Please enter institution name'),
  yearsOfExperience: Yup.string().min(1).required('Please enter experience'),
  pay: Yup.string().min(1).required('Please enter salary'),
  payInterval: Yup.string().required('Please select pay interval'),
  location: Yup.string().min(1).required('Please enter location'),
  jobDescription: Yup.string().required('Please enter a job description'),
  isPublished: Yup.boolean(),
  expiryDate: Yup.date().required('Please enter an expiration Date'),
  id: Yup.string(),
  jobStartDate: Yup.date().required('Please enter a start Date'),
  jobEndDate: Yup.date().nullable(),
});

// export const CreateJobPostSchema = Yup.object().shape({
//   title: Yup.string().min(2).required('Please provide job title'),
//   institutionName: Yup.string()
//     .min(2)
//     .required('Please enter institution name'),
//   yearsOfExperience: Yup.string().min(1).required('Please enter experience'),
//   pay: Yup.string().min(1).required('Please enter salary'),
//   payInterval: Yup.string().required('Please select pay interval'),
//   location: Yup.string().min(1).required('Please enter location'),
//   jobDescription: Yup.string().required('Please enter a job description'),
//   isPublished: Yup.boolean(),
//   // expiryDate: Yup.date().required('Please enter an expiration Date'),
//   expiryDate: Yup.date()
//     .transform((value, originalValue) => {
//       if (typeof originalValue === 'string') {
//         const parsedDate = parse(originalValue, 'dd/MM/yyyy', new Date());
//         return isValid(parsedDate) ? parsedDate : new Date('');
//       }
//       return value;
//     })
//     .required('Please enter an expiration Date'),
//   id: Yup.string(),
//   jobStartDate: Yup.date()
//     .transform((value, originalValue) => {
//       if (typeof originalValue === 'string') {
//         const parsedDate = parse(originalValue, 'dd/MM/yyyy', new Date());
//         return isValid(parsedDate) ? parsedDate : new Date('');
//       }
//       return value;
//     })
//     .required('Please enter a start Date'),
//   jobEndDate: Yup.date()
//     .transform((value, originalValue) => {
//       if (typeof originalValue === 'string') {
//         const parsedDate = parse(originalValue, 'dd/MM/yyyy', new Date());
//         return isValid(parsedDate) ? parsedDate : new Date('');
//       }
//       return value;
//     })
//     .nullable(),
// });

export type CreateJobPostDataType = Yup.InferType<typeof CreateJobPostSchema>;

type InitialValues = {
  title: string;
  institutionName: string;
  yearsOfExperience: string;
  pay: string;
  payInterval: string;
  location: string;
  jobDescription: string;
  isPublished: boolean;
  expiryDate: string;
  id?: string;
  jobStartDate: string;
  jobEndDate: string;
};

export const createJobPostInitialValues: InitialValues = {
  title: '',
  institutionName: '',
  yearsOfExperience: '',
  pay: '',
  payInterval: '',
  location: '',
  isPublished: false,
  expiryDate: '',
  jobDescription: '',
  id: '',
  jobStartDate: '',
  jobEndDate: '',
};
