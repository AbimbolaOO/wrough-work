import { useField, useFormikContext } from 'formik';

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

export const NumberOnlyInputField: React.FC<IInputField> = ({
  label,
  lpiSrc,
  rpiSrc,
  className,
  // apiKey,
  ...props
}) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext<any>();

  const handleChange = (e: any) => {
    const { value } = e.target;

    if (/^\d*$/.test(value)) {
      setFieldValue(props.name, value);
    } else if (value === '') {
      setFieldValue(props.name, value);
    }
  };

  return (
    <InputWrapper className={className}>
      <InputLabel htmlFor={props.name || props.id}>{label}</InputLabel>
      <InputContainer>
        <Input
          {...field}
          {...props}
          value={field?.value ?? ''}
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

export default NumberOnlyInputField;
