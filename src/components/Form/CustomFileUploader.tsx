import { useField, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import FileIcon from '../Icons/FileIcon';
import { FieldErrorInfo } from './FormField';

interface CustomFileUploaderProps {
  label: string;
  name: string;
  className?: string;
  children?: any;
}

const CustomFileUploader: React.FC<CustomFileUploaderProps> = ({
  label,
  name,
  className,
}) => {
  const [field, meta, helpers] = useField(name);
  const [imageName, setImageName] = useState<string>('');
  const { handleBlur } = useFormikContext<any>();

  useEffect(() => {
    if (field.value) {
      const file = field.value as File;
      if (typeof file === 'string') {
        setImageName(file);
      } else {
        setImageName(file.name);
      }
    } else {
      setImageName('');
    }
    // eslint-disable-next-line
  }, [field.value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      helpers.setValue(file);
    }
  };

  return (
    <InputWrapper className={className}>
      <InputLabel htmlFor={name}>
        {label}
        <InputContainer>
          <FileInputField
            id={name}
            name={name}
            type='file'
            accept='.pdf, image/*'
            onChange={handleChange}
          />

          <IconStyle>
            <FileIcon />
          </IconStyle>

          <PseudoFormField
            tabIndex={0}
            onClick={() => handleBlur({ target: { name: name } })}
          >
            {imageName}
          </PseudoFormField>
        </InputContainer>
      </InputLabel>

      {meta.touched && meta.error ? (
        <FieldErrorInfo>{meta.error}</FieldErrorInfo>
      ) : null}
    </InputWrapper>
  );
};

export default CustomFileUploader;

const FileInputField = styled.input`
  display: none;
  border: 1px solid red;
`;

const PseudoFormField = styled.div`
  text-align: left;
  font-weight: 300;
  color: ${({ theme }) => theme.palette.blackBlack2};
  font-size: 16px;
  cursor: text;
  overflow: auto;

  display: grid;
  width: calc(100% - 64px);

  margin: 12px;

  /* hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  &:hover {
    cursor: url('/static/svg/file-cursor.svg'), copy;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: grid;
  height: fit-content;
  position: relative;
  /* border: 1px solid red; */
  border: 1px solid ${({ theme }) => theme.palette.greyGrey3};
  border-radius: 4px;
  height: 56px;

  & > * {
    grid-column: 1;
    grid-row: 1;
  }

  &:focus-within {
    outline: none;
    border-color: ${({ theme }) => theme.palette.greyGrey1};
  }

  &:hover {
    cursor: url('/static/svg/file-cursor.svg'), copy;
  }
`;

const IconStyle = styled.div`
  position: absolute;
  top: 17px;
  right: 18px;
  z-index: 1;
  background-color: white;
`;
