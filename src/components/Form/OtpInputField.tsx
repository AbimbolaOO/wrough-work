import { useField, useFormikContext } from 'formik';
import React, { useRef } from 'react';

import styled from '@emotion/styled';

interface OTPInputFieldProps {
  label: string;
  name: string;
  className?: string;
}

const OTPInputField: React.FC<OTPInputFieldProps> = ({
  label,
  name,
  className,
}) => {
  const { setFieldValue } = useFormikContext<any>();
  const [field, meta] = useField(name);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value)) {
      const otp = field.value.split('');
      otp[index] = value;
      setFieldValue(name, otp.join(''));

      if (index < 5 && value) {
        inputsRef.current[index + 1]?.focus();
      }
    } else if (value === '') {
      const otp = field.value.split('');
      otp[index] = '';
      setFieldValue(name, otp.join(''));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace') {
      const otp = field.value.split('');
      if (otp[index] === '') {
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
          const prevOtp = field.value.split('');
          prevOtp[index - 1] = '';
          setFieldValue(name, prevOtp.join(''));
        }
      } else {
        otp[index] = '';
        setFieldValue(name, otp.join(''));
      }
    }
  };

  return (
    <InputWrapper className={className}>
      <InputLabel>{label}</InputLabel>
      <OTPContainer>
        {Array.from({ length: 4 }).map((_, index) => (
          <OTPInput
            key={index}
            type='text'
            maxLength={1}
            value={field.value[index] || ''}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
          />
        ))}
      </OTPContainer>
      {meta.touched && meta.error ? (
        <FieldErrorInfo>{meta.error}</FieldErrorInfo>
      ) : null}
    </InputWrapper>
  );
};

export default OTPInputField;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputLabel = styled.label`
  font-weight: 500;
  font-size: 14px;
  color: black;
`;

const OTPContainer = styled.div`
  display: flex;
  gap: 32px;
  justify-content: center;

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const OTPInput = styled.input`
  border: 2px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 6px;
  padding: 12px;
  text-align: center;
  font-weight: 400;
  font-size: 1rem;
  width: 50px;
  height: 50px;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.palette.greyGrey1};
    border: none;
  }
`;

const FieldErrorInfo = styled.div`
  font-size: 12px;
  color: red;
  margin-top: -10px;
  justify-content: center;
  text-align: center;
`;
