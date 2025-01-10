import { useField } from 'formik';
import React from 'react';

import styled from '@emotion/styled';

import { FormComponent } from '../../../../components/Form/FormComponent';
import { FieldErrorInfo } from '../../../../components/Form/FormField';
import SearchIcon from '../../../../components/Icons/SearchIcon';
import {
  mailingListInitialValues,
  MailingListSchema,
} from '../../../../models/mailingList/mailingList.model';

export interface IInputField {
  label?: any;
  id?: string;
  name: string;
  placeholder?: string;
  rpiSrc?: string;
  lpiSrc?: string;
  children?: any;
  className?: string;
}

const CustomInputField: React.FC<IInputField> = ({
  label,
  className,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <InputWrapper className={className}>
      <InputLabel htmlFor={props.name || props.id}>{label}</InputLabel>
      <InputContainer>
        <Input {...field} {...props} />

        <RightPlaceHolderCardIcon
          alt='icon'
          src={'/static/svg/search-right-icon.svg'}
        />

        <LeftPlaceHolderCardIcon
          alt='icon'
          src={'/static/svg/search-left-icon.svg'}
        />
      </InputContainer>
      {meta.touched && meta.error ? (
        <FieldErrorInfo>{meta.error}</FieldErrorInfo>
      ) : null}
    </InputWrapper>
  );
};

interface JobSearchFormProps {
  showMobileInfo: boolean;
}

const JobSearchForm: React.FC<JobSearchFormProps> = ({ showMobileInfo }) => {
  return (
    <Container className={showMobileInfo ? 'hideMobileScreen' : ''}>
      <FormComponent
        initialValues={mailingListInitialValues}
        schema={MailingListSchema}
        onSubmit={onsubmit}
      >
        <Box>
          <CustomInputField
            name='lastName'
            id='lastName'
            placeholder='Enter job title, keyword or company name'
            className='hideOnSmallScreen'
          />
          <CustomInputField
            name='lastName'
            id='lastName'
            placeholder='Search Jobs'
            className='hideOnLargeScreen'
          />
          <FormSubmitButton type='submit' className='hideOnSmallScreen'>
            Find Jobs
          </FormSubmitButton>
          <FormSubmitButton type='submit' className='hideOnLargeScreen'>
            <SearchIcon />
          </FormSubmitButton>
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
  margin-top: 32px;
  /* border: 1px solid red; */

  @media (max-width: 884px) {
    margin-top: 0px;

    &.hideMobileScreen {
      display: none;
    }
  }

  @media (max-width: 768px) {
    top: 90px;
  }
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  background-color: white;
  padding: 16px 52px;
  border-radius: 12px;
  /* border: 1px solid red; */

  @media (max-width: 768px) {
    padding: 0;
    background-color: #f2f8fd;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;

  /*  */
  &.hideOnSmallScreen {
    @media (max-width: 480px) {
      display: none;
    }
  }

  &.hideOnLargeScreen {
    @media (min-width: 481px) {
      display: none;
    }
  }
`;

export const InputLabel = styled.label`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.blackBlack2};
  white-space: nowrap;
  & > span {
    color: ${({ theme }) => theme.palette.greyGrey2};
    font-size: 15px;
    font-weight: 400;
  }
`;

export const InputContainer = styled.div`
  display: grid;
  height: fit-content;

  & > * {
    grid-column: 1;
    grid-row: 1;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const Input = styled.input`
  border-radius: 4px;
  padding: 15px;

  padding-left: 62px;
  padding-right: 62px;

  text-align: left;
  font-weight: 300;
  color: ${({ theme }) => theme.palette.blackBlack2};
  font-size: 16px;
  border: 1.5px solid transparent;
  background-color: ${({ theme }) => theme.palette.greyGrey4};
  height: 45px;
  cursor: text;
  /* appearance: none; */

  &:focus {
    outline: none;
    border: 1.5px solid ${({ theme }) => theme.palette.mainBlue};
  }

  &:hover {
    cursor: text;
  }

  &::placeholder {
    color: ${({ theme }) => theme.palette.greyGrey3};
    font-size: 18px;
    font-weight: 300;
  }
  /* border: 1px solid red; */

  @media (max-width: 768px) {
    padding-left: 48px;
    padding-right: 48px;
    border: 1.5px solid ${({ theme }) => theme.palette.greyGrey3};
  }

  @media (max-width: 480px) {
    padding-left: 16px;
    padding-right: 43px;
  }
`;

const FormSubmitButton = styled.button`
  background: ${({ theme }) => theme.palette.mainBlue};
  font-weight: 600;
  font-size: 18px;
  color: white;
  border: 1px solid transparent;
  cursor: pointer;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  padding: 4px 38px;

  @media (max-width: 768px) {
    /* border: 1px solid red; */
    padding: 4px 14px;
  }

  @media (max-width: 480px) {
    font-weight: 500;
    font-size: 16px;
    padding: 4px 10px;
  }

  @media (max-width: 340px) {
    padding: 4px;
  }

  &.hideOnSmallScreen {
    @media (max-width: 480px) {
      display: none;
    }
  }

  &.hideOnLargeScreen {
    @media (min-width: 481px) {
      display: none;
    }
  }
`;

export const LeftPlaceHolderCardIcon = styled.img`
  display: grid;
  margin-left: 30px;
  margin-top: 1rem;
  place-content: center;
  margin-top: auto;
  margin-bottom: auto;

  width: 24px;
  height: 24px;

  @media (max-width: 768px) {
    margin-left: 16px;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

export const RightPlaceHolderCardIcon = styled.img`
  display: grid;
  margin-right: 30px;
  margin-left: auto;
  place-content: center;
  margin-top: auto;
  margin-bottom: auto;

  width: 24px;
  height: 24px;

  @media (max-width: 768px) {
    margin-right: 16px;
  }

  @media (max-width: 480px) {
    width: 22px;
    height: 22px;
  }
`;
