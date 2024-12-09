import styled from '@emotion/styled';

import ValidatingFormSubmitButton from '../../../../components/Button/FormSubmitButton';
import { FormComponent } from '../../../../components/Form/FormComponent';
import { PasswordInputField } from '../../../../components/Form/FormField';
import {
  ResetDataType,
  ResetInitialValues,
  ResetSchema,
} from '../../../../models/settings/profileSettings/passwordReset.model';

const PasswordSettings = () => {
  const handleSubmit = async (values: ResetDataType) => {
    alert(`Running this since 1847 ${JSON.stringify(values)}`);
  };

  return (
    <Container>
      <PasswordForm
        className={'customFormLayout'}
        initialValues={ResetInitialValues}
        schema={ResetSchema}
        onSubmit={handleSubmit}
      >
        <PasswordInputField
          label={'Old Password'}
          name='oldPassword'
          type='text'
        />
        <PasswordInputField
          label={'New Password'}
          name='newPassword'
          type='text'
        />
        <PasswordInputField
          label={'Re - enter Password'}
          name='password'
          type='text'
        />

        <ValidatingFormSubmitButton className='max-width-40rem'>
          Change Password
        </ValidatingFormSubmitButton>
        <p>
          Can't remember Password?<span>Reset Password</span>
        </p>
      </PasswordForm>
    </Container>
  );
};

export default PasswordSettings;

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 0.375rem;
  padding: 2rem;
  display: grid;
  gap: 2rem;
  color: ${({ theme }) => theme.palette.blackBlack2};
  font-size: 1.125rem;

  // Mobile-specific styles
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PasswordForm = styled(FormComponent)`
  display: flex;
  flex-direction: column;
  & > p {
    width: 100%;
    max-width: 40rem;
    display: flex;
    gap: 0.7rem;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 400;
    line-height: 26.91px;
    letter-spacing: -0.02em;
    & > span {
      color: #2f80ed;
      cursor: pointer;
    }
  }

  // Mobile-specific styles
  @media (max-width: 768px) {
    & > p {
      font-size: 14px;
      font-weight: 400;
    }
  }
`;
