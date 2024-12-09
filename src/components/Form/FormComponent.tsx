import { Form, Formik } from 'formik';
import React from 'react';

import styled from '@emotion/styled';

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
  display: grid;
  gap: 24px;
  width: 100%;
  grid-template-columns: 1fr;
`;
