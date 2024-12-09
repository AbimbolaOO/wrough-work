import * as Yup from 'yup';

export const MailingListSchema = Yup.object().shape({
  email: Yup.string().email(),
});

export type MailingListDataType = Yup.InferType<typeof MailingListSchema>;

type InitialValues = {
  email: string;
};

export const mailingListInitialValues: InitialValues = {
  email: '',
};
