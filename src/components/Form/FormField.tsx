import { useField } from "formik";
import React, { useState } from "react";

import styled from "@emotion/styled";

import CanceledEyeIcon from "../Icons/CanceledEyeIcon";
import EyeIcon from "../Icons/EyeIcon";

export interface IInputField {
  label?: any;
  id?: string;
  name: string;
  type: string;
  placeholder?: string;
  rpiSrc?: string;
  lpiSrc?: string;
  children?: any;
  className?: string;
  date?: string;
  read?: boolean;
}

export const SelectField: React.FC<
  Omit<IInputField, "placeholder" | "type">
> = ({ label, lpiSrc, rpiSrc, className, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <InputWrapper className={className}>
      <InputLabel htmlFor={props.name || props.id}>{label}</InputLabel>
      <InputContainer>
        <Select {...field} {...props} />
        {lpiSrc ? <LeftPlaceHolderCardIcon alt="icon" src={lpiSrc} /> : null}
        {rpiSrc ? <RightPlaceHolderCardIcon alt="icon" src={rpiSrc} /> : null}
      </InputContainer>
      {meta.touched && meta.error ? (
        <FieldErrorInfo>{meta.error}</FieldErrorInfo>
      ) : null}
    </InputWrapper>
  );
};

export const TextInputField: React.FC<IInputField> = ({
  label,
  lpiSrc,
  rpiSrc,
  className,
  read,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <InputWrapper className={className}>
      <InputLabel htmlFor={props.name || props.id}>{label}</InputLabel>
      <InputContainer>
        <Input
          {...field}
          {...props}
          className={className ? className : ""}
          readOnly={read}
        />
        {lpiSrc ? <LeftPlaceHolderCardIcon alt="icon" src={lpiSrc} /> : null}
        {rpiSrc ? <RightPlaceHolderCardIcon alt="icon" src={rpiSrc} /> : null}
      </InputContainer>
      {meta.touched && meta.error ? (
        <FieldErrorInfo>{meta.error}</FieldErrorInfo>
      ) : null}
    </InputWrapper>
  );
};

export const TextAreaInputField: React.FC<IInputField> = ({
  label,
  lpiSrc,
  rpiSrc,
  className,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <InputWrapper className={className}>
      <InputLabel htmlFor={props.name || props.id}>{label}</InputLabel>
      <InputContainer>
        <TextArea
          {...field}
          {...props}
          className={className ? className : ""}
          rows={7}
        />
        {lpiSrc ? <LeftPlaceHolderCardIcon alt="icon" src={lpiSrc} /> : null}
        {rpiSrc ? <RightPlaceHolderCardIcon alt="icon" src={rpiSrc} /> : null}
      </InputContainer>
      {meta.touched && meta.error ? (
        <FieldErrorInfo>{meta.error}</FieldErrorInfo>
      ) : null}
    </InputWrapper>
  );
};

export const Checkbox: React.FC<Pick<IInputField, "name" | "children">> = ({
  children,
  ...props
}) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <CheckboxWrapper>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <FieldErrorInfo>{meta.error}</FieldErrorInfo>
      ) : null}
    </CheckboxWrapper>
  );
};

interface IUploadField {
  label: string;
  name: string;
  className?: string;
  children?: any;
}

export const UploadField: React.FC<IUploadField> = ({
  label,
  name,
  className,
  children,
}) => {
  const [, meta, helpers] = useField(name);
  const { setValue } = helpers;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setValue(event.currentTarget.files[0]);
    }
  };

  return (
    <InputWrapper className={className}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <InputContainer>
        <Input id={name} name={name} type="file" onChange={handleChange} />
        {children}
      </InputContainer>
      {meta.touched && meta.error ? (
        <FieldErrorInfo>{meta.error}</FieldErrorInfo>
      ) : null}
    </InputWrapper>
  );
};

export const PasswordInputField: React.FC<IInputField> = ({
  label,
  lpiSrc,
  rpiSrc,
  className,
  ...props
}) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <PasswordWrapper className={className}>
      <InputLabel htmlFor={props.name || props.id}>{label}</InputLabel>
      <PasswordContainer>
        <Password
          {...field}
          {...props}
          type={showPassword ? "text" : "password"}
          className={className ? className : ""}
        />
        {lpiSrc && <PasswordLeftIcon alt="icon" src={lpiSrc} />}
        <PasswordToggleIcon onClick={togglePasswordVisibility}>
          {showPassword ? <CanceledEyeIcon /> : <EyeIcon />}
        </PasswordToggleIcon>
      </PasswordContainer>
      {meta.touched && meta.error ? (
        <FieldErrorInfo>{meta.error}</FieldErrorInfo>
      ) : null}
    </PasswordWrapper>
  );
};

export const DateInputField: React.FC<IInputField> = ({
  label,
  lpiSrc,
  rpiSrc,
  className,
  date,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.valueAsDate;
    if (selectedDate) {
      helpers.setValue(formatDate(selectedDate));
    } else {
      helpers.setValue(event.target.value);
    }
  };

  return (
    <InputWrapper className={className}>
      <InputLabel htmlFor={props.name || props.id}>
        {label} <span>{date}</span>
      </InputLabel>
      <InputContainer>
        <Input
          {...field}
          {...props}
          type="date"
          onChange={handleChange}
          className={className ? className : ""}
        />
        {lpiSrc ? <LeftPlaceHolderCardIcon alt="icon" src={lpiSrc} /> : null}
        {rpiSrc ? <RightPlaceHolderCardIcon alt="icon" src={rpiSrc} /> : null}
      </InputContainer>
      {meta.touched && meta.error ? (
        <FieldErrorInfo>{meta.error}</FieldErrorInfo>
      ) : null}
    </InputWrapper>
  );
};

// styles just for PasswordInputField
const PasswordWrapper = styled.div`
  width: 100%;
  max-width: 40rem;
`;

const PasswordContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Password = styled.input`
  /* border: 2px solid green; */
  width: 100%;
  border-radius: 4px;
  padding: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.palette.blackBlack2};
  font-size: 1.125rem;
  border: 1px solid ${({ theme }) => theme.palette.greyGrey3};
  cursor: text;
  /* appearance: none; */

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.greyGrey1};
  }
  &:hover {
    cursor: text;
  }

  &::placeholder {
    color: 1px solid ${({ theme }) => theme.palette.greyGrey3};
    font-size: 1.125rem;
    font-weight: 300;

    //mobile-specific styles
    @media (max-width: 768px) {
      font-size: 15px;
    }
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    padding: 12px;
    font-size: 15px;
  }
`;

const PasswordToggleIcon = styled.div`
  position: absolute;
  right: 19px;
  cursor: pointer;
`;

const PasswordLeftIcon = styled.img`
  margin-right: 8px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.blackBlack2};

  & > label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  & > label > input[type="checkbox"] {
    color: red;
    margin-right: 10px;
    cursor: pointer;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    font-size: 12.5px;
  }
`;

export const FieldErrorInfo = styled.div`
  font-size: 1rem;
  color: red;
  text-align: left;

  //mobile-specific styles
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  & .jobdate {
    width: 12rem;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    & .jobdate {
      width: 10rem;
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

  //mobile-specific styles
  @media (max-width: 768px) {
    font-size: 16px;
    font-weight: 400;
    line-height: 23.92px;
    letter-spacing: -1px;

    & > span {
      font-size: 12px;
    }
  }
`;

interface IInput {
  textAlign?: string;
  lpiSrc?: string;
  rpiSrc?: string;
  contact?: string;
}

export const Input = styled.input<IInput>`
  /* border: 2px solid green; */
  border-radius: 4px;
  padding: 15px;
  text-align: left;
  font-weight: 300;
  color: ${({ theme }) => theme.palette.blackBlack2};
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.palette.greyGrey3};
  cursor: text;
  /* appearance: none; */

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.greyGrey1};
  }
  &:hover {
    cursor: text;
  }

  &::placeholder {
    color: 1px solid ${({ theme }) => theme.palette.greyGrey3};
    font-size: 1.125rem;
    font-weight: 300;

    //mobile-specific styles
    @media (max-width: 768px) {
      font-size: 15px;
    }
  }
  &.read {
    color: ${({ theme }) => theme.palette.greyGrey2};
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    padding: 12px;
    font-size: 15px;
    background-color: inherit;
    width: 100%;
  }
`;

const TextArea = styled.textarea<IInput>`
  width: 100%;
  max-width: 35rem;
  border: 1px solid ${({ theme }) => theme.palette.greyGrey3};
  border-radius: 4px;
  padding: ${({ lpiSrc, rpiSrc }) => (lpiSrc || rpiSrc ? "5rem" : "1rem")};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};
  font-weight: 300;
  color: ${({ theme }) => theme.palette.blackBlack2};
  font-size: 1.125rem;
  resize: none;

  /* appearance: none; */

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.greyGrey1};
  }
  &:hover {
    cursor: pointer;
  }

  &::placeholder {
    color: 1px solid ${({ theme }) => theme.palette.greyGrey3};
    font-size: 1.125rem;
    font-weight: 300;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    padding: 12px;
    font-size: 15px;
    background-color: inherit;
    width: 100%;

    &::placeholder {
      font-size: 12px;
    }
  }
`;

const Select = styled.select`
  /* border: 2px solid red; */
  /* max-width: 400px; */
  border-radius: 4px;
  padding: 15px;
  font-weight: 300;
  color: ${({ theme }) => theme.palette.blackBlack2};
  border: 1px solid ${({ theme }) => theme.palette.greyGrey3};
  font-size: 1rem;
  height: fit-content;

  appearance: none;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.greyGrey1};
  }
  &:hover {
    cursor: pointer;
  }

  &::placeholder {
    color: 1px solid ${({ theme }) => theme.palette.greyGrey3};
    font-size: 1rem;
    font-weight: 300;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    padding: 12px;
    font-size: 15px;
    background-color: inherit;
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

  //mobile-specific styles
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const LeftPlaceHolderCardIcon = styled.img`
  display: grid;
  margin-left: 1rem;
  margin-top: 1rem;
  place-content: center;
  margin-top: auto;
  margin-bottom: auto;
`;

export const RightPlaceHolderCardIcon = styled.img`
  display: grid;
  margin-right: 1rem;
  margin-left: auto;
  place-content: center;
  margin-top: auto;
  margin-bottom: auto;
`;
