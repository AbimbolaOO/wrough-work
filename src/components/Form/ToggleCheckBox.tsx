import { useField } from 'formik';
import { useState } from 'react';

import styled from '@emotion/styled';

import { ToggleButton } from '../ToggleButton/ToggleButton';
import { IInputField } from './FormField';

export const ToggleCheckBox: React.FC<
  Pick<IInputField, 'name' | 'id' | 'children' | 'className'>
> = ({ children, className, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  const [toggleState, setToggleState] = useState(false);

  return (
    <CheckboxWrapper className={className}>
      <Container>
        <label className={className}>
          <Checkbox type='checkbox' {...field} {...props} />
          <span>
            <ToggleButton
              controller={() => setToggleState(!toggleState)}
              defaultState={toggleState}
            />
            {/* {''} */}
          </span>
        </label>
        {children}
      </Container>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error.capitalize()}</div>
      ) : null}
    </CheckboxWrapper>
  );
};

const Container = styled.div`
  display: flex;
  /* border: 1px solid red; */
  align-items: center;
  justify-content: center;
  /* gap: 8px; */
`;

const Checkbox = styled.input`
  /* border: 1px solid red; */
`;

const CheckboxWrapper = styled.div`
  display: flex;
  gap: 12px;
  font-size: 18px;
  font-weight: 400;
  color: black;
  cursor: default;

  & > div {
    & > label {
      position: relative;
      display: flex;
      align-items: center;
      user-select: none;
      /* border: 1px solid green; */
    }

    & > label input[type='checkbox'] {
      margin-right: 32px;
      margin-left: 2px;
    }

    & > label input[type='checkbox'] ~ span {
      position: absolute;
      left: -2px;
    }

    & > * {
      cursor: pointer;
    }
  }
`;
