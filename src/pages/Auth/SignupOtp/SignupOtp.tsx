import { useLocation } from 'react-router-dom';

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
  const email = location?.state?.data;

  const { signupVerficationOtp, loading: otpLoading } =
    useSignupUserVerificationOtp();

  const { resendSignupVerficationOtp, loading: otpResendLoading } =
    useResendUserSignupVerificationOtp();

  const onSubmit = (values: VerifySignUpOtpDataType) => {
    signupVerficationOtp(values, email);
  };

  const handleOtpResend = () => {
    resendSignupVerficationOtp(email);
  };

  return (
    <Formtainer header="Check your Email">
      <FormComponent
        initialValues={verifySignUpOtpInitialValues}
        schema={verifySignUpOtpSchema}
        onSubmit={onSubmit}
        className={'column'}
      >
        <FeildBox>
          <Label>
            {`We have sent a verification code to your email address: ${email.obfuscateEmail()}`}
          </Label>
          <OTPInputField label="" name="otp" />
        </FeildBox>
        <P>
          Didn't get the code?
          <Button onClick={handleOtpResend} className="regular">
            Click to resend {otpResendLoading && <LoadingOutlined />}
          </Button>
        </P>

        <ValidatingFormSubmitButton className="fillParent" loading={otpLoading}>
          Verify
        </ValidatingFormSubmitButton>
      </FormComponent>
    </Formtainer>
  );
};

export default SignupOtp;

const FeildBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* outline: 2px solid red; */
  gap: 58px;
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

const P = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.blackBlack2};
  font-weight: 400;
`;

const Button = styled.div`
  color: ${({ theme }) => theme.palette.purplePurple1};
  background-color: transparent;
  cursor: pointer;
`;
