import * as Yup from "yup";

export const newPassWordSchema = Yup.object().shape({
  password: Yup.string().required("Enter New PassWord"),
});

export type newPassWordDataType = Yup.InferType<typeof newPassWordSchema>;

type InitialValues = {
  password: string;
};

export const newPasswordInitialValues: InitialValues = {
  password: "",
};

export interface INewPassWord {
  password: string;
}
