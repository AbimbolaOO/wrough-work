import * as Yup from 'yup';

export const verifySignUpOtpSchema = Yup.object().shape({
  otp: Yup.string().min(4).max(4).required('OTP is required.'),
});

export type VerifySignUpOtpDataType = Yup.InferType<
  typeof verifySignUpOtpSchema
>;

export type InitialValues = {
  otp: String;
};

export const verifySignUpOtpInitialValues: InitialValues = {
  otp: '',
};
