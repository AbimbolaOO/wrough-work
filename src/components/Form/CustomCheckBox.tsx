import { useField } from 'formik';

import styled from '@emotion/styled';

import CheckMarkIcon from '../Icons/CheckMarkIcon';
import { IInputField } from './FormField';

export const CustomCheckbox: React.FC<
  Pick<IInputField, 'name' | 'id' | 'children' | 'className'>
> = ({ children, className, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <CheckboxWrapper className={className}>
      <label className={className}>
        <input type='checkbox' {...field} {...props} />
        {children}
        <span>
          <CheckMarkIcon />
        </span>
      </label>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error.capitalize()}</div>
      ) : null}
    </CheckboxWrapper>
  );
};

const CheckboxWrapper = styled.div`
  display: flex;
  gap: 12px;

  & > label {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 400;
    color: black;
    user-select: none;

    &.column {
      flex-direction: column-reverse;
      gap: 8px;
      justify-content: flex-end;
    }
  }

  & > label input[type='checkbox'] {
    margin-right: 18px;
  }

  & > label.column input[type='checkbox'] {
    margin-right: 40px;
  }

  & > label input[type='checkbox'] ~ span {
    content: '';
    width: 20px;
    height: 20px;
    background-color: white;
    color: white;
    border: 1px solid ${({ theme }) => theme.palette.greyGrey3};

    border-radius: 4px;
    position: absolute;
    left: 0;
  }

  & > label.column input[type='checkbox'] ~ span {
    left: 0px;
    bottom: calc(50% - 8px);
  }

  & > label:hover input[type='checkbox'] ~ span {
    border: 1px solid ${({ theme }) => theme.palette.borderColor};
  }

  & > label input[type='checkbox']:checked ~ span {
    background-color: ${({ theme }) => theme.palette.mainBlue};
    border: 1px solid ${({ theme }) => theme.palette.mainBlue};
  }

  & > * {
    cursor: pointer;
  }
`;
