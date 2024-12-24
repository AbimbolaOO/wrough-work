import * as Yup from 'yup';

export const ApplyToJobPostWithResumeSchema = Yup.object().shape({
  resumeUrl: Yup.string().min(2).required('Please select a resume'),
  resumeFile: Yup.mixed()
    .required('Upload your resume')
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
});

export type ApplyToJobPostWithResumeDataType = Yup.InferType<
  typeof ApplyToJobPostWithResumeSchema
>;

type InitialValues = {
  resumeUrl: string;
  resumeFile: string;
};

export const applyToJobPostWithResumeInitialValues: InitialValues = {
  resumeUrl: '',
  resumeFile: '',
};
