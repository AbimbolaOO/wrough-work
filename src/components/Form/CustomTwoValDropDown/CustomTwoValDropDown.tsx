import { useField, useFormikContext } from 'formik';
import React from 'react';

import styled from '@emotion/styled';

import { FieldErrorInfo, Input, InputLabel, InputWrapper } from '../FormField';
import SelectDropDown from './SelectDropDown';

interface CustomTwoValDropDownProps {
  label?: any;
  id: string;
  name: string;
  placeholder?: string;
  dropdownPlaceholder?: string;
  className?: string;
  readonly?: boolean;
  optionData: string[];
  optionName: string;
}

const CustomTwoValDropDown: React.FC<CustomTwoValDropDownProps> = ({
  label,
  className,
  optionData = [],
  optionName,
  placeholder,
  dropdownPlaceholder,
  ...props
}) => {
  const [field, meta, helper] = useField(props);
  const { errors } = useFormikContext<any>();

  const handleChange = (e: any) => {
    const { value } = e.target;

    if (/^\d*$/.test(value)) {
      helper.setValue(value);
    } else if (value === '') {
      helper.setValue(value);
    }
  };

  return (
    <InputWrapper className={className}>
      {label && (
        <InputLabel as='div' htmlFor={props.name || props.id}>
          {label}
        </InputLabel>
      )}
      <FieldRow>
        <WrapInput
          {...field}
          {...props}
          value={field?.value ?? ''}
          onChange={(e) => handleChange(e)}
        />
        <DividerLine />
        <SelectDropDown
          optionData={optionData}
          name={optionName}
          id={optionName}
          placeholder={dropdownPlaceholder}
        />
      </FieldRow>

      {meta.touched && meta.error ? (
        <FieldErrorInfo>{meta.error.capitalize()}</FieldErrorInfo>
      ) : null}

      {meta.touched && !meta.error && errors[optionName] ? (
        <FieldErrorInfo>
          {String(errors[optionName]).capitalize()}
        </FieldErrorInfo>
      ) : null}
    </InputWrapper>
  );
};

export default CustomTwoValDropDown;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.greyGrey3};
  border-radius: 4px;

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.palette.greyGrey1};
  }

  @media (max-width: 480px) {
    grid-template-columns: 45vw 2px 100px;
  }
`;

const DividerLine = styled.div`
  display: flex;
  height: 44px;
  width: 1px;
  background-color: ${({ theme }) => theme.palette.greyGrey3};
`;

const WrapInput = styled(Input)`
  border: none;
  display: flex;
`;
