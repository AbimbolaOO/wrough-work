import React from 'react';

import styled from '@emotion/styled';

import { FormSubmitButton } from '../../../../components/Button/FormSubmitButton';
import { FormComponent } from '../../../../components/Form/FormComponent';
import { TextInputField } from '../../../../components/Form/FormField';
import {
  mailingListInitialValues,
  MailingListSchema,
} from '../../../../models/mailingList/mailingList.model';

const JobSearchForm = () => {
  return (
    <Container>
      <FormComponent
        initialValues={mailingListInitialValues}
        schema={MailingListSchema}
        onSubmit={onsubmit}
      >
        <Box>
          <TextInputField
            name='lastName'
            id='lastName'
            type='text'
            placeholder='Enter job title, keyword or company name'
            lpiSrc='/static/svg/search-left-icon.svg'
            rpiSrc='/static/svg/search-right-icon.svg'
          />
          <FormSubmitButton type='submit'>Find Jobs</FormSubmitButton>
        </Box>
      </FormComponent>
    </Container>
  );
};

export default JobSearchForm;

const Container = styled.div`
  /* border: 1px solid red; */
  position: sticky;
  top: 70px;
  z-index: 20;
  justify-content: center;
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: 1fr 142px;
  gap: 24px;
  background-color: white;
  padding: 16px 52px;
  border-radius: 12px;
  /* border: 1px solid red; */

  & > *,
  & > * > * > * {
    height: 45px;
  }

  & > * > * > * {
    background-color: ${({ theme }) => theme.palette.greyGrey4};
    border: 1.5px solid transparent !important;
    &::placeholder {
      color: ${({ theme }) => theme.palette.greyGrey3};
    }

    &:focus {
      border: 1.5px solid ${({ theme }) => theme.palette.mainBlue} !important;
    }
  }
`;
