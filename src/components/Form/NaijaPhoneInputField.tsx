import { useField } from 'formik';
import { useEffect, useState } from 'react';

import { formatPhoneNumberInputField } from '../../utils/utils';
import {
  FieldErrorInfo,
  IInputField,
  Input,
  InputContainer,
  InputLabel,
  InputWrapper,
  LeftPlaceHolderCardIcon,
  RightPlaceHolderCardIcon,
} from './FormField';

export const NaijaPhoneInputField: React.FC<IInputField> = ({
  label,
  lpiSrc,
  rpiSrc,
  className,
  ...props
}) => {
  const [field, meta, helper] = useField(props);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (field.value) {
      setInputValue(formatPhoneNumberInputField(field.value));
    } else {
      setInputValue(field.value);
    }
  }, [field.value]);

  const handleChange = (e: any) => {
    const { value } = e.target;

    if (/^[+\d-]*$/.test(value)) {
      helper.setValue(value);
      setInputValue(formatPhoneNumberInputField(value));
      // setInputValue(value);
    } else if (value === '') {
      helper.setValue(value);
      setInputValue(value);
    }
  };

  return (
    <InputWrapper className={className}>
      <InputLabel htmlFor={props.name || props.id}>{label}</InputLabel>
      <InputContainer>
        <Input
          {...field}
          {...props}
          value={inputValue}
          onChange={(e) => handleChange(e)}
        />
        {lpiSrc ? <LeftPlaceHolderCardIcon alt='icon' src={lpiSrc} /> : null}
        {rpiSrc ? <RightPlaceHolderCardIcon alt='icon' src={rpiSrc} /> : null}
      </InputContainer>
      {meta.touched && meta.error ? (
        <FieldErrorInfo>{meta.error.capitalize()}</FieldErrorInfo>
      ) : null}
    </InputWrapper>
  );
};

export default NaijaPhoneInputField;
