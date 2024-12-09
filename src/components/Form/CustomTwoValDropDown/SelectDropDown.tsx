import { useField, useFormikContext } from 'formik';
import React, { useEffect, useReducer, useRef, useState } from 'react';

import styled from '@emotion/styled';

import useOutsideClick from '../../../hooks/ui-control/useOutsideClick';
import ChevronFormDown from '../../Icons/ChevronFormDown';
import ChevronFormUp from '../../Icons/ChevronFormUp';
import { Input } from '../FormField';

interface SelectDropDownProps {
  id: string;
  name: string;
  placeholder?: string;
  className?: string;
  readonly?: boolean;
  optionData: string[];
  setIsEditing: (...args: any) => void;
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

const SelectDropDown: React.FC<SelectDropDownProps> = ({
  className,
  setIsEditing,
  optionData = [],
  ...props
}) => {
  const selectFieldRef = useRef<HTMLDivElement>(null);
  useOutsideClick(selectFieldRef, () => setDidTouchSelectField(false));

  const { handleBlur } = useFormikContext<any>();
  const [field, , helper] = useField(props);
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
    setIsEditing(true);
  };

  const handleOptionClick = (e: any) => {
    const value = e.target.innerText;
    helper.setValue(value);
    setDidTouchSelectField(false);
  };

  const handIconClick = (e: any) => {
    setDidTouchSelectField(!didTouchSelectField);
  };

  const handleFormBlur = () => {
    setIsEditing(false);
    return handleBlur({ target: { name: props.name } });
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
    <SelectInputContainer ref={selectFieldRef}>
      <SelectFieldBox
        placeholder={props.placeholder ?? ''}
        type='text'
        onChange={handleSelectFieldChange}
        value={selectFieldValue}
        name={props.name}
        id={props.name}
        onBlur={handleFormBlur}
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
    </SelectInputContainer>
  );
};

export default SelectDropDown;

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

export const SelectInputContainer = styled.div`
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

const SelectFieldBox = styled(Input)`
  border: none;
  width: 116px;
  /* padding-left: 0px; */
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
  border: 1px solid ${({ theme }) => theme.palette.greyGrey3};
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
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};

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
