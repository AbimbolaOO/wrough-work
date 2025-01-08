import * as Yup from 'yup';

export const PickCandidateSchema = Yup.object().shape({
  candidate: Yup.string().min(2),
});

export type PickCandidateDataType = Yup.InferType<typeof PickCandidateSchema>;

type InitialValues = {
  candidate: string;
};

export const pickCandidateInitialValues: InitialValues = {
  candidate: '',
};
