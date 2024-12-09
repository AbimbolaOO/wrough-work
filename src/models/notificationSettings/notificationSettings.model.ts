import * as Yup from 'yup';

export const NotificationSettingsSchema = Yup.object().shape({
  email: Yup.boolean(),
  pushNotification: Yup.boolean(),
  telNotification: Yup.boolean(),
});

export type NotificationSettingsDataType = Yup.InferType<
  typeof NotificationSettingsSchema
>;

type InitialValues = {
  email: boolean;
  pushNotification: boolean;
  telNotification: boolean;
};

export const NotificationSettingsInitialValues: InitialValues = {
  email: false,
  pushNotification: false,
  telNotification: false,
};
