import { useFormikContext } from 'formik';
import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

interface IValidatingFormSubmitButton {
  loading?: boolean;
  children: string;
  className?: string;
}

const ValidatingFormSubmitButton: React.FC<IValidatingFormSubmitButton> = ({
  loading,
  children,
  className,
}) => {
  const { dirty, isValid } = useFormikContext<any>();

  return (
    <FormSubmitButton
      type='submit'
      className={className}
      disabled={isValid && dirty ? false : true}
    >
      {children}
      {loading && <LoadingOutlined />}
    </FormSubmitButton>
  );
};

export default ValidatingFormSubmitButton;

export const FormSubmitButton = styled.button`
  background: ${({ theme }) => theme.palette.mainBlue};
  font-weight: 600;
  font-size: 18px;
  color: white;
  border: 1px solid transparent;
  cursor: pointer;
  width: fit-content;

  /* for the spinner */
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  padding: 14px;

  /*  */
  &.placeLeft {
    width: fit-content;
    margin-left: auto;
  }

  &.fillParent {
    width: 100%;
  }

  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.palette.greyGrey3};
  }

  &.max-width-40rem {
    width: 100%;
    max-width: 40rem;
  }

  &.small {
    padding: 0.5rem 4rem;
    font-weight: 500;
    font-size: 14px;
  }

  &.right-mt {
    margin-top: 32px;
    margin-left: auto;
  }

  // Mobile-specific styles
  @media (max-width: 768px) {
    &.max-width-40rem {
      width: 180px;
      height: 40px;
      font-size: 14px;
      font-weight: 500;
    }

    &.notification {
      font-size: 14px;
      padding: 0.3rem;
      font-weight: 400;
    }
  }
`;
