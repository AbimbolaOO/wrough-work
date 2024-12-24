import { useField, useFormikContext } from 'formik';
import React from 'react';

import styled from '@emotion/styled';

import { FieldErrorInfo } from './FormField';

interface CustomRadioGroupProps {
  children: React.ReactNode;
  name: string;
}

export const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  children,
  name,
}) => {
  const { errors } = useFormikContext<any>();

  return (
    <RadioGroup>
      {React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          ...child.props,
        });
        // }
      })}

      {errors[name] ? (
        <CustomFieldErrorInfo>
          {(errors as any)[name].capitalize()}
        </CustomFieldErrorInfo>
      ) : null}
    </RadioGroup>
  );
};

export interface CustomRadioProps {
  label?: any;
  id?: string;
  name: string;
  children?: any;
  className?: string;
  value?: string;
}

export const CustomRadio: React.FC<CustomRadioProps> = ({
  children,
  className,
  ...props
}) => {
  const [field] = useField({ ...props, type: 'radio' });

  return (
    <RadioWrapper className={className}>
      <label>
        <input type='radio' {...field} {...props} />
        {children}
        <span />
      </label>
    </RadioWrapper>
  );
};

const RadioWrapper = styled.div`
  display: flex;
  gap: 8px;
  font-weight: 400;

  & > label {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    width: 100%;
    color: ${({ theme }) => theme.palette.blackBlack3};
  }

  & > label input[type='radio'] {
    margin-right: 18px;
  }

  & > label input[type='radio'] ~ span {
    width: 24px;
    height: 24px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.palette.blackBlack3};
    border-radius: 50%;
    position: absolute;
    left: 0;
  }

  & > label:hover input[type='radio'] ~ span {
    border: 1px solid ${({ theme }) => theme.palette.borderColor};
  }

  & > label input[type='radio']:checked ~ span {
    border: 8px solid ${({ theme }) => theme.palette.mainBlue};
  }

  & > * {
    cursor: pointer;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  /* border: 1px solid red; */
`;

const CustomFieldErrorInfo = styled(FieldErrorInfo)`
  margin-top: -10px;
`;
