import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

import {
  ErrorHttpResponse,
  HttpConfig,
  SuccessHttpResponse,
} from '../../models/https';
import useHttps from '../useHttps';

const useResendUserSignupVerificationOtp = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);

  const onResendSignupVerficationOtpError = (
    err: AxiosError<ErrorHttpResponse>
  ) => {
    console.log('onLoginError');
    toast.error(err?.response?.data?.message ?? 'Something went wrong');
  };

  const onResendSignupVerficationOtp = ({
    message,
  }: SuccessHttpResponse<any>) => {
    console.log('onResendSignupVerficationOtp -->>', message);
    toast.success(message);
  };

  const resendSignupVerficationOtp = (email: string) => {
    const url: HttpConfig = {
      url: `auth-service/users/signup/resend-otp`,
      method: 'post',
      data: { email },
    };

    request(
      url,
      onResendSignupVerficationOtp,
      setLoading,
      onResendSignupVerficationOtpError
    );
  };

  return {
    loading,
    resendSignupVerficationOtp,
  };
};

export default useResendUserSignupVerificationOtp;
