import { NavLink } from 'react-router-dom';

import styled from '@emotion/styled';

import Formtainer from '../../../components/Authlayout/Formtainer';
import ValidatingFormSubmitButton from '../../../components/Button/FormSubmitButton';
import { FormComponent } from '../../../components/Form/FormComponent';
import { TextInputField } from '../../../components/Form/FormField';
import useUserResetPassword from '../../../hooks/auth/useUserResetPassword';
import {
  resetPasswordInitialValues,
  ResetPaswdDataType,
  ResetPaswdSchema,
} from '../../../models/auth/resetPassword.model';
import { LOCUM_SIGNUP } from '../../../routes/routeConstants';

const ForgotPassword = () => {
  const { resetUserPassword, loading: resetPasswordLoading } =
    useUserResetPassword();

  const onSubmit = (value: ResetPaswdDataType) => {
    resetUserPassword({ ...value, email: value?.email?.toLowerCase() });
  };

  return (
    <Formtainer header='PASSWORD RESET'>
      <FormComponent
        initialValues={resetPasswordInitialValues}
        schema={ResetPaswdSchema}
        onSubmit={onSubmit}
        className={'column'}
      >
        <FieldBox>
          <Label>Enter your email address to reset password</Label>
          <TextInputField
            label='Email Address'
            name='email'
            id='email'
            type='email'
            placeholder='Email'
          />
        </FieldBox>

        <ValidatingFormSubmitButton
          className='fillParent'
          loading={resetPasswordLoading}
        >
          Reset Password
        </ValidatingFormSubmitButton>
      </FormComponent>
      <StyledNav to={LOCUM_SIGNUP}>Back Home</StyledNav>
    </Formtainer>
  );
};

export default ForgotPassword;

const FieldBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* outline: 2px solid red; */
  gap: 58px;
  margin-top: -20px;
  justify-content: center;
  /* width: fit-content; */
`;

const Label = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  font-weight: 300;
  gap: 4px;
  color: ${({ theme }) => theme.palette.greyGrey1};
`;

const StyledNav = styled(NavLink)`
  color: ${({ theme }) => theme.palette.mainBlue};
  text-decoration: none;
  font-weight: 400;
`;
