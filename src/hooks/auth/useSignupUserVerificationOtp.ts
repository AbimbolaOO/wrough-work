import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { VerifySignUpOtpDataType } from '../../models/auth/verifySignUpOtp.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../models/https';
import { ACCOUNT, SIGNIN } from '../../routes/routeConstants';
import useHttps from '../useHttps';

const useSignupUserVerificationOtp = () => {
  const navigate = useNavigate();
  const request = useHttps();
  const [loading, setLoading] = useState(false);

  const onSignUpError = (err: AxiosError<ErrorHttpResponse>) => {
    console.log('onLoginError');
    toast.error(err?.response?.data?.message ?? 'Something went wrong');
  };

  const onSignupVerificationOtp = (_: SuccessHttpResponse<any>) => {
    navigate(`/${ACCOUNT}/${SIGNIN}`, {
      replace: true,
    });
  };

  const signupVerificationOtp = (
    data: VerifySignUpOtpDataType,
    email: string
  ) => {
    const url: HttpConfig = {
      url: 'auth-service/users/signup/otp',
      method: 'post',
      data: {
        email: email.toLowerCase(),
        ...data,
      },
    };

    request(url, onSignupVerificationOtp, setLoading, onSignUpError);
  };

  return {
    loading,
    signupVerificationOtp,
  };
};

export default useSignupUserVerificationOtp;
