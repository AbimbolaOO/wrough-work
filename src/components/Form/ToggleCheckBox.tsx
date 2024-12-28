import { useField } from 'formik';

import styled from '@emotion/styled';

import { IInputField } from './FormField';

export const ToggleCheckBox: React.FC<
  Pick<IInputField, 'name' | 'id' | 'children' | 'className'>
> = ({ children, className, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <CheckboxWrapper className={className}>
      <Container>
        <label className={className}>
          <Checkbox type='checkbox' {...field} {...props} />
          <span>
            <StyledToggleButton>
              <MovingCircle />
            </StyledToggleButton>
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

    & > label input[type='checkbox']:checked ~ span > div {
      background-color: #27ae60;
    }

    & > label input[type='checkbox']:checked ~ span > div > div {
      transform: translateX(15.5px);
      background-color: white;
    }

    & > * {
      cursor: pointer;
    }
  }
`;

const StyledToggleButton = styled.div`
  width: 2.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  border-radius: 1rem;
  border: 2px solid #27ae60;
  cursor: pointer;
  transition: background-color 0.4s ease;
  background-color: white;
`;

const MovingCircle = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.2s ease;
  transform: translateX(0);
  background-color: #27ae60;
`;
