import { useNavigate } from 'react-router';

import styled from '@emotion/styled';

import Formtainer from '../../../components/Authlayout/Formtainer';
import ValidatingFormSubmitButton from '../../../components/Button/FormSubmitButton';
import SwitchAccountButton from '../../../components/Button/SwitchAccountButton';
import { FormComponent } from '../../../components/Form/FormComponent';
import {
  Checkbox,
  PasswordInputField,
  TextInputField,
} from '../../../components/Form/FormField';
import { InternalNavLink } from '../../../components/Link/Link';
import { configSetting } from '../../../config';
import useUserSignin from '../../../hooks/auth/useUserSignin';
import {
  LocumSignInDataType,
  locumSigninInitialValues,
  LocumSignInSchema,
} from '../../../models/auth/signIn.model';
import {
  ACCOUNT,
  FORGOT_PASSWORD,
  SIGNUP,
} from '../../../routes/routeConstants';

const SignIn = () => {
  const { signinUser, loading: userSiginLoading } = useUserSignin();
  const navigate = useNavigate();
  const onSubmit = async (values: LocumSignInDataType) => {
    signinUser({ ...values, email: values.email.toLowerCase() });
  };

  return (
    <>
      <Formtainer header='SIGN INTO YOUR ACCOUNT' className='signin'>
        <SwitchAccountButton
          path={`${configSetting.healthDashboardUrl}/account/signin/health-signin`}
        />
        <FormComponent
          initialValues={locumSigninInitialValues}
          schema={LocumSignInSchema}
          onSubmit={onSubmit}
        >
          <TextInputField
            label='Email Address'
            name='email'
            id='email'
            type='email'
            placeholder='Email'
          />
          <PasswordInputField
            label='Password'
            name='password'
            type='password'
            id='password'
            placeholder='Password'
          />
          <RememberMeAndForgotPassword>
            <Checkbox name='rememberMe' className='terms'>
              Remember me
            </Checkbox>
            <p
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate(`/${ACCOUNT}/${FORGOT_PASSWORD}`);
              }}
            >
              Forgot Password?
            </p>
          </RememberMeAndForgotPassword>
          <ValidatingFormSubmitButton
            className='fillParent'
            loading={userSiginLoading}
          >
            Login
          </ValidatingFormSubmitButton>
        </FormComponent>
      </Formtainer>
      <P>
        Don't have an account?{' '}
        <InternalNavLink to={`/${ACCOUNT}/${SIGNUP}`} className='regular'>
          Sign Up
        </InternalNavLink>
      </P>
      <ForgotPasswordMobile
        style={{ cursor: 'pointer' }}
        onClick={() => {
          navigate(`/${ACCOUNT}/${FORGOT_PASSWORD}`);
        }}
      >
        Forgot Password?
      </ForgotPasswordMobile>
    </>
  );
};

export default SignIn;

const RememberMeAndForgotPassword = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.palette.blackBlack2};
  font-weight: 500;
  font-size: 18px;

  & > p {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const P = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.blackBlack2};
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const ForgotPasswordMobile = styled(P)`
  @media (min-width: 768px) {
    display: none;
  }
`;
