import { useField, useFormikContext } from 'formik';
import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import { FieldErrorInfo, InputWrapper } from './FormField';

export interface CustomResumeUploadButtonProps {
  className?: string;
  id?: string;
  name: string;
  controlKey: string;
}

const CustomResumeUploadButton: React.FC<CustomResumeUploadButtonProps> = ({
  controlKey,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (field.value) {
      const file = field.value as File;
      setFieldValue(controlKey, file.name);
    }
    // eslint-disable-next-line
  }, [field.value]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      helpers.setValue(file);
    }
  };

  return (
    <InputWrapper>
      <ButtonArea>
        <ImageUploaderLabel htmlFor={props.name || props.id}>
          <ChangeImage>upload Resume</ChangeImage>
          <ImgInputField
            name={props.name}
            id={props.name}
            type='file'
            // accept='image/*'
            onChange={handleImageChange}
          />
        </ImageUploaderLabel>
      </ButtonArea>

      {meta.touched && meta.error ? (
        <FieldErrorInfo>{meta.error.capitalize()}</FieldErrorInfo>
      ) : null}
    </InputWrapper>
  );
};

export default CustomResumeUploadButton;

export const InputContainer = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
`;

const ImageUploaderLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 16px;
  width: fit-content;
  cursor: pointer;
`;

const ImgInputField = styled.input`
  display: none;
`;

const ChangeImage = styled.div`
  font-weight: 400;
  font-size: 18px;
  /* font-size: 14px;
  line-height: 14px; */
  border: 1px solid ${({ theme }) => theme.palette.greyGrey3};
  color: ${({ theme }) => theme.palette.blackBlack3};
  padding: 14px 32px;
  border-radius: 4px;
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 16px;
`;
