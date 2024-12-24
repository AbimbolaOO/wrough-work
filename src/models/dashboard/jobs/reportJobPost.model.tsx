import * as Yup from 'yup';

export const ReportJobPostSchema = Yup.object().shape({
  reason: Yup.string().min(2).required('Please select a reason'),
  otherReason: Yup.string().min(2, 'Reason must be at least 2 characters'),
});

export type ReportJobPostDataType = Yup.InferType<typeof ReportJobPostSchema>;

type InitialValues = {
  reason: string;
  otherReason: string;
};

export const reportJobPostInitialValues: InitialValues = {
  reason: '',
  otherReason: '',
};
