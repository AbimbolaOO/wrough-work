import { useField, useFormikContext } from 'formik';
import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import { FieldErrorInfo, InputWrapper } from './FormField';

export interface ImageUploadButtonProps {
  className?: string;
  id?: string;
  name: string;
  defaultImgUrl?: string | null;
  setDefaultImgUrl: (...args: any) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  defaultImgUrl,
  setDefaultImgUrl,
  ...props
}) => {
  const { submitForm } = useFormikContext();
  const [field, meta, helpers] = useField(props);

  useEffect(() => {
    if (field.value) {
      const file = field.value as File;
      const previewUrl = URL.createObjectURL(file);
      setDefaultImgUrl(previewUrl);
      submitForm();

      return () => {
        URL.revokeObjectURL(previewUrl);
      };
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
          <ChangeImage>Edit Profile</ChangeImage>
          <ImgInputField
            name={props.name}
            id={props.name}
            type='file'
            accept='image/*'
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

export default ImageUploadButton;

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
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  border: 1px solid ${({ theme }) => theme.palette.greyGrey2};
  color: ${({ theme }) => theme.palette.greyGrey2};
  padding: 10px 25.5px;
  border-radius: 4px;
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 16px;
`;
