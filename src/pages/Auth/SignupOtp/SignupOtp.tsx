import { useLocation } from 'react-router';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import Formtainer from '../../../components/Authlayout/Formtainer';
import ValidatingFormSubmitButton from '../../../components/Button/FormSubmitButton';
import { FormComponent } from '../../../components/Form/FormComponent';
import OTPInputField from '../../../components/Form/OtpInputField';
import useResendUserSignupVerificationOtp from '../../../hooks/auth/useResendUserSignupVerificationOtp';
import useSignupUserVerificationOtp from '../../../hooks/auth/useSignupUserVerificationOtp';
import {
  VerifySignUpOtpDataType,
  verifySignUpOtpInitialValues,
  verifySignUpOtpSchema,
} from '../../../models/auth/verifySignUpOtp.model';

const SignupOtp = () => {
  const location = useLocation();
  const email: string = location?.state?.data ?? '';

  const { signupVerificationOtp, loading: otpLoading } =
    useSignupUserVerificationOtp();

  const { resendSignupVerificationOtp, loading: otpResendLoading } =
    useResendUserSignupVerificationOtp();

  const onSubmit = (values: VerifySignUpOtpDataType) => {
    signupVerificationOtp(values, email?.toLowerCase());
  };

  const handleOtpResend = () => {
    resendSignupVerificationOtp(email?.toLowerCase());
  };

  return (
    <Formtainer header='Check your Email'>
      <FormComponent
        initialValues={verifySignUpOtpInitialValues}
        schema={verifySignUpOtpSchema}
        onSubmit={onSubmit}
        className={'column'}
      >
        <FieldBox>
          <Label>
            {`We have sent a verification code to your email address: ${email.obfuscateEmail()}`}
          </Label>
          <OTPInputField label='' name='otp' />
        </FieldBox>
        <P>
          Didn't get the code?
          <Button onClick={handleOtpResend} className='regular'>
            Click to resend {otpResendLoading && <LoadingOutlined />}
          </Button>
        </P>

        <ValidatingFormSubmitButton className='fillParent' loading={otpLoading}>
          Verify
        </ValidatingFormSubmitButton>
      </FormComponent>
    </Formtainer>
  );
};

export default SignupOtp;

const FieldBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* outline: 2px solid red; */
  gap: 16px;
  width: fit-content;
`;

const Label = styled.div`
  display: flex;
  text-align: center;
  font-size: 20px;
  font-weight: 300;
  gap: 4px;
  color: ${({ theme }) => theme.palette.greyGrey1};
`;

const P = styled.span`
  display: flex;
  gap: 4px;
  justify-content: center;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.blackBlack2};
  font-weight: 400;
  width: 100%;
  /* border: 1px solid red; */

  @media (max-width: 370px) {
    font-size: 16px;
  }

  @media (max-width: 340px) {
    font-size: 14px;
  }
`;

const Button = styled.div`
  color: ${({ theme }) => theme.palette.purplePurple1};
  background-color: transparent;
  cursor: pointer;
`;
