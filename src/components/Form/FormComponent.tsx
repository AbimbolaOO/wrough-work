import { Form, Formik } from 'formik';
import React from 'react';

import styled from '@emotion/styled';

interface IFormComponent {
  initialValues: any;
  schema: any;
  onSubmit: any;
  children: any;
  className?: any;
  autoComplete?: string;
}

export const FormComponent: React.FC<IFormComponent> = ({
  initialValues,
  schema,
  onSubmit,
  children,
  className,
  autoComplete = 'on',
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      <StyledForm className={className} autoComplete={autoComplete}>
        {children}
      </StyledForm>
    </Formik>
  );
};

const StyledForm = styled(Form)`
  display: grid;
  gap: 24px;
  width: 100%;
  grid-template-columns: 1fr;
`;
