import * as Yup from 'yup';

export const CreateJobInterviewSchema = Yup.object().shape({
  interviewDate: Yup.string().min(2),
});

export type CreateJobInterviewDataType = Yup.InferType<
  typeof CreateJobInterviewSchema
>;

type InitialValues = {
  interviewDate: string;
};

export const createJobInterviewInitialValues: InitialValues = {
  interviewDate: '',
};

export interface ICreateJobInterviewData {
  duration: string;
  interviewDate?: string;
}
