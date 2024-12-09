import * as Yup from "yup";
import {
  JobPostingSchemaGet,
} from "../jobPosting/jobPosting.model";

export const jobAppSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  resume: Yup.mixed().test(
    "fileFormat",
    "Unsupported file format",
    (value) => value && value instanceof Blob
  ),
  id: Yup.string().nullable(),
  userId: Yup.string().nullable(),
  status: Yup.string().nullable(),
  createdAt: Yup.string().nullable(),
  updatedAt: Yup.string().nullable(),
  job: JobPostingSchemaGet.optional().nullable(),
});

export type jobAppDataType = Yup.InferType<typeof jobAppSchema>;

type InitialValues = {
  firstName: string;
  lastName: string;
  email: string;
  resume: any;
  id?: string;
  userId?: string;
  status?: "SUBMITTED" | "SCREENING" | "INTERVIEW" | "REJECTED" | "ACCEPTED";
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export const jobAppInitialValues: InitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  resume: null,
  id: "",
  userId: "",
  status: "SUBMITTED",
  createdAt: "",
  updatedAt: "",
};
