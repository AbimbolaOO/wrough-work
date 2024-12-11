import { useField, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { truncateTextByCharacters } from '../../utils/utils';
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
      setImageName(file.name);
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
            accept='.pdf'
            onChange={handleChange}
            // onBlur={() => handleBlur({ target: { name: name } })}
          />
          <IconStyle>
            <FileIcon />
          </IconStyle>
        </InputContainer>

        <PseudoFormField
          tabIndex={0}
          onClick={() => handleBlur({ target: { name: name } })}
        >
          {truncateTextByCharacters(imageName, 40)}
        </PseudoFormField>
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
  border-radius: 4px;
  padding: 15px;
  text-align: left;
  font-weight: 300;
  color: ${({ theme }) => theme.palette.blackBlack2};
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.palette.greyGrey3};
  cursor: text;
  height: 56px;
  overflow: auto;

  /* appearance: none; */

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.greyGrey1};
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

  & > * {
    grid-column: 1;
    grid-row: 1;
  }
  &:hover {
    cursor: pointer;
  }
`;

const IconStyle = styled.div`
  position: absolute;
  top: 17px;
  right: 18px;
  z-index: 1;
`;
