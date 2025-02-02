import { useField, useFormikContext } from 'formik';
import React, { useEffect, useReducer, useRef, useState } from 'react';

import styled from '@emotion/styled';

import useOutsideClick from '../../hooks/ui-control/useOutsideClick';
import ChevronFormDown from '../Icons/ChevronFormDown';
import ChevronFormUp from '../Icons/ChevronFormUp';
import { FieldErrorInfo, Input, InputLabel, InputWrapper } from './FormField';

interface CustomSelectFieldProps {
  label?: any;
  id: string;
  name: string;
  placeholder?: string;
  className?: string;
  readonly?: boolean;
  optionData: string[];
}

// Type definition
export enum OptionReducerActionType {
  CLICKED_OPTION = 'option-clicked',
}

interface IOptionReducerActionType {
  type: OptionReducerActionType;
  payload: { index: number };
}

// Reducers
function selectOptionsReducer(
  state: { index: number },
  action: IOptionReducerActionType
) {
  switch (action.type) {
    case OptionReducerActionType.CLICKED_OPTION:
      return { ...action.payload };
    default:
      return state;
  }
}

export const CustomSelectField: React.FC<CustomSelectFieldProps> = ({
  label,
  className,
  optionData = [],
  ...props
}) => {
  const selectFieldRef = useRef<HTMLDivElement>(null);
  useOutsideClick(selectFieldRef, () => setDidTouchSelectField(false));

  const { handleBlur } = useFormikContext<any>();
  const [field, meta, helper] = useField(props);
  const [selectFieldValue, setSelectFieldValue] = useState<string>('');
  const [didTouchSelectField, setDidTouchSelectField] =
    useState<boolean>(false);

  useEffect(() => {
    setSelectFieldValue(field.value);
  }, [field.value]);

  const handleSelectFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectFieldValue(e.target.value);
    helper.setValue('');
  };

  const handleSelectFieldClick = (e: any) => {
    setDidTouchSelectField(true);
  };

  const handleOptionClick = (e: any) => {
    const value = e.target.innerText;
    helper.setValue(value);
    setDidTouchSelectField(false);
  };

  const handIconClick = (e: any) => {
    setDidTouchSelectField(!didTouchSelectField);
  };

  const [state, dispatch] = useReducer(selectOptionsReducer, {
    index: -1,
  });

  const handleOptionStateChange = (index: any) => {
    dispatch({
      type: OptionReducerActionType.CLICKED_OPTION,
      payload: { index },
    });

    return handleOptionClick;
  };

  return (
    <InputWrapper className={className}>
      {label && (
        <InputLabel as='div' htmlFor={props.name || props.id}>
          {label}
        </InputLabel>
      )}
      <InputContainer ref={selectFieldRef}>
        <SelectFieldBox
          placeholder={props.placeholder ?? ''}
          type='text'
          onChange={handleSelectFieldChange}
          value={selectFieldValue}
          name={props.name}
          id={props.name}
          onBlur={handleBlur}
          onClick={handleSelectFieldClick}
          className={didTouchSelectField ? 'active' : ''}
          readOnly
        />

        {didTouchSelectField ? (
          <IconStyle onClick={handIconClick}>
            <ChevronFormUp />
          </IconStyle>
        ) : (
          <IconStyle onClick={handIconClick}>
            <ChevronFormDown />
          </IconStyle>
        )}

        {didTouchSelectField && (
          <SelectOptionBox>
            {optionData.map((data, index) => {
              const isSelected = index === state.index ? true : false;
              return (
                <SelectOption
                  key={index}
                  handleOptionClick={(e) => {
                    handleOptionClick(e);
                    handleOptionStateChange(index);
                  }}
                  isSelected={isSelected}
                >
                  {data}
                </SelectOption>
              );
            })}
          </SelectOptionBox>
        )}
      </InputContainer>
      {meta.touched && meta.error ? (
        <FieldErrorInfo>{meta.error.capitalize()}</FieldErrorInfo>
      ) : null}
    </InputWrapper>
  );
};

export default CustomSelectField;

interface SelectOptionProps {
  handleOptionClick: (...args: any) => void;
  isSelected: boolean;
  children: string;
}

export const SelectOption: React.FC<SelectOptionProps> = ({
  handleOptionClick,
  isSelected,
  children,
}) => {
  return (
    <Option
      onClick={handleOptionClick}
      className={isSelected ? 'isSelected' : ''}
    >
      {children}
    </Option>
  );
};

const SelectFieldBox = styled(Input)`
  padding-right: 36px;
  &.active {
    border-color: ${({ theme }) => theme.palette.greyGrey1};
  }
`;

export const InputContainer = styled.div`
  display: grid;
  height: fit-content;
  position: relative;
  height: fit-content;

  & > * {
    grid-column: 1;
    grid-row: 1;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const SelectOptionBox = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  max-height: 180px;
  display: flex;
  overflow: auto;
  flex-direction: column;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.palette.greyGrey1};
  border-radius: 6px;
  background-color: white;
  margin-top: 4px;
  z-index: 10;
`;

export const Option = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  padding: 14px 16px;
  font-size: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.greyGrey3};

  &:hover {
    background-color: ${({ theme }) => theme.palette.highlightColor};
  }

  &:last-of-type {
    border: none;
  }

  &.isSelected {
    background-color: ${({ theme }) => theme.palette.highlightColor};
  }
`;

const IconStyle = styled.div`
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 13px;
  z-index: 8;
`;
