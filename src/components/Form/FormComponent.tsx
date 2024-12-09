import { Form, Formik } from "formik";
import React from "react";

import styled from "@emotion/styled";

interface IFormComponent {
  initialValues: any;
  schema: any;
  onSubmit: any;
  children: any;
  className?: any;
  data?: any; // Add userData as an optional prop
}

export const FormComponent: React.FC<IFormComponent> = ({
  initialValues,
  schema,
  onSubmit,
  children,
  className,
  data, // Accept userData prop
}) => {
  // Merge initialValues with userData if userData exists
  const mergedInitialValues = {
    ...initialValues,
    ...data,
    yearsOfExperience:
      data?.yearsOfExperience?.toString() || initialValues.yearsOfExperience,
  };

  return (
    <Formik
      initialValues={mergedInitialValues} // Use the merged values
      validationSchema={schema}
      onSubmit={onSubmit}
      enableReinitialize={true} // Ensure the form reinitializes when userData changes
    >
      <StyledForm className={className}>{children}</StyledForm>
    </Formik>
  );
};

const StyledForm = styled(Form)`
  /* border: 2px solid orange; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  /* border: 2px solid red; */
  width: 100%;

  &.column {
    grid-template-columns: 1fr;
  }

  &.flex {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: start;
    align-items: center;
  }

  &.smflex {
    @media (max-width: 480px) {
      flex-direction: column;
      width: 90%;
    }
  }

  & > .spanTwo {
    /* border: 2px solid green; */
    grid-column: span 2;
  }

  & > .margin {
    /* border: 2px solid green; */
    grid-column: span 2;
    margin-left: 15%;
    margin-right: 15%;
  }

  &.horizontalForm {
    grid-template-columns: 5fr 1fr;
    align-items: last baseline;
  }

  &.contact {
    @media (max-width: 480px) {
      display: flex;
      flex-direction: column;
    }
  }

  & .btncontain {
    grid-column: span 2;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    .jobform {
      height: fit-content;
      overflow-y: scroll;
    }

    &.respondflex {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      justify-content: start;
      align-items: center;
    }
  }
`;
