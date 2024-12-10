import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../models/https';
import useHttps from '../useHttps';

const useResendUserSignupVerificationOtp = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);

  const onResendSignupVerificationOtpError = (
    err: AxiosError<ErrorHttpResponse>
  ) => {
    console.log('onLoginError');
    toast.error(err?.response?.data?.message ?? 'Something went wrong');
  };

  const onResendSignupVerificationOtp = ({
    message,
  }: SuccessHttpResponse<any>) => {
    console.log('onResendSignupVerificationOtp -->>', message);
    toast.success(message);
  };

  const resendSignupVerificationOtp = (email: string) => {
    const url: HttpConfig = {
      url: `auth-service/users/signup/resend-otp`,
      method: 'post',
      data: { email },
    };

    request(
      url,
      onResendSignupVerificationOtp,
      setLoading,
      onResendSignupVerificationOtpError
    );
  };

  return {
    loading,
    resendSignupVerificationOtp,
  };
};

export default useResendUserSignupVerificationOtp;
