import * as Yup from "yup";

export const JobPostingSchemaPost = Yup.object().shape({
  title: Yup.string().min(1).required("Please provide job title"),
  institutionName: Yup.string()
    .min(1)
    .required("Please enter institution name"),
  yearsOfExperience: Yup.string().min(1).required("Please enter Experience"),
  pay: Yup.number().min(1).required("Please enter Salary"),
  payInterval: Yup.string().required("Please select pay interval"),
  location: Yup.string().min(1).required("Please enter Location"),
  jobDescription: Yup.string().required("Please enter a job description"),
  isPublished: Yup.boolean(),
  expiryDate: Yup.date().required("Please enter an Expiration Date"),
  id: Yup.string(),
  jobStartDate: Yup.date().required("Please enter a Start Date"),
  jobEndDate: Yup.date().nullable(),
  // applyResume: Yup.boolean(),
});

export const JobPostingSchemaGet = Yup.object().shape({
  title: Yup.string().min(1).required("Please provide job title"),
  institutionName: Yup.string()
    .min(1)
    .required("Please enter institution name"),
  yearsOfExperience: Yup.string().min(1).required("Please enter Experience"),
  pay: Yup.number().min(1).required("Please enter Salary"),
  payInterval: Yup.string().required("Please select pay interval"),
  location: Yup.string().min(1).required("Please enter Location"),
  jobDescription: Yup.object({
    jobDescription: Yup.string().required("Please enter a job description"),
  }), // Object for getting
  isPublished: Yup.boolean(),
  expiryDate: Yup.date().required("Please enter an Expiration Date"),
  id: Yup.string(),
  jobStartDate: Yup.date().required("Please enter a Start Date"),
  jobEndDate: Yup.date().nullable(),
  jobCreatorId: Yup.string(),
});

export type JobPostingDataType = Yup.InferType<typeof JobPostingSchemaPost>;

export type JobPostingDataTypeGet = Yup.InferType<typeof JobPostingSchemaGet>;

type InitialValues = {
  title: string;
  institutionName: string;
  yearsOfExperience: string;
  pay: number;
  payInterval: string;
  location: string;
  jobDescription: string;
  isPublished: boolean;
  expiryDate: Date | null;
  id?: string;
  jobStartDate: Date | null;
  jobEndDate: Date | null;
  // applyResume: boolean;
};

export const jobPostingInitialValues: InitialValues = {
  title: "",
  institutionName: "",
  yearsOfExperience: "",
  pay: 0,
  payInterval: "",
  location: "",
  isPublished: false,
  expiryDate: null,
  jobDescription: "",
  id: "",
  jobStartDate: null,
  jobEndDate: null,
  // applyResume: false,
};
