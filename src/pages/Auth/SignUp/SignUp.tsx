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
import { ExternalLink, InternalNavLink } from '../../../components/Link/Link';
import { configSetting } from '../../../config';
import useUserSignup from '../../../hooks/auth/useUserSignup';
import {
  SignUpDataType,
  signUpInitialValues,
  SignUpSchema,
} from '../../../models/auth/signUp.model';
import { ACCOUNT, SIGNIN } from '../../../routes/routeConstants';

const Signup = () => {
  const { signupUser, loading: userSignUpLoading } = useUserSignup();
  const onSubmit = async (values: SignUpDataType) => {
    console.log(values);
    signupUser({ ...values, email: values.email.toLowerCase() });
  };

  return (
    <>
      <Formtainer header='CREATE YOUR ACCOUNT'>
        <SwitchAccountButton
          path={`${configSetting.healthDashboardUrl}/account/signup/health-signup`}
        />
        <FormComponent
          initialValues={signUpInitialValues}
          schema={SignUpSchema}
          onSubmit={onSubmit}
          className={'column'}
        >
          <TextInputField
            label='First Name'
            name='firstName'
            id='firstName'
            type='text'
            placeholder='Enter your first name'
          />
          <TextInputField
            label='Last Name'
            name='lastName'
            id='lastName'
            type='text'
            placeholder='Enter your last name'
          />
          <TextInputField
            label='Email Address'
            name='email'
            id='email'
            type='email'
            placeholder='Enter your email'
          />
          <PasswordInputField
            label='Password'
            name='password'
            type='password'
            id='password'
            placeholder='Enter your password'
          />

          <Checkbox name='isTermsAccepted' className='terms'>
            <span>
              By creating an account, I agree to the
              <ExternalLink href={`https://locumspace.co/T&Cs`}>
                {' '}
                Terms and Conditions
              </ExternalLink>
            </span>
          </Checkbox>

          <ValidatingFormSubmitButton
            className='fillParent'
            loading={userSignUpLoading}
          >
            Create Account
          </ValidatingFormSubmitButton>
        </FormComponent>
      </Formtainer>
      <P>
        Already have an account?
        <InternalNavLink to={`/${ACCOUNT}/${SIGNIN}`} className='regular'>
          Sign In
        </InternalNavLink>
      </P>
    </>
  );
};

export default Signup;

const P = styled.span`
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
