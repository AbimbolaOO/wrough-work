import * as Yup from "yup";

export const profilepicschema = Yup.object().shape({
  profileImage: Yup.mixed()
    .required("Select an Image")
    .test("fileFormat", "Unsupported file format", (value) => {
      // Ensure the value is a File and check its type
      return (
        value &&
        value instanceof File &&
        [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/bmp",
          "image/webp",
        ].includes(value.type)
      );
    }),
});

export type profilePicDataType = Yup.InferType<typeof profilepicschema>;

type InitialValues = {
  profileImage: File | null;
};

export const profilePicInfoInitialValues: InitialValues = {
  profileImage: null,
};
