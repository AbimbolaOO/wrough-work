import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Signupdata } from '../../models/auth/signUp.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../models/https';
import { ACCOUNT, SIGNUP_OTP } from '../../routes/routeConstants';
import useHttps from '../useHttps';

const useUserSignup = () => {
  const navigate = useNavigate();
  const request = useHttps();
  const [loading, setLoading] = useState(false);

  const onSigupSuccess =
    (email: string) =>
      ({ data }: SuccessHttpResponse<any>) =>
        navigate(`/${ACCOUNT}/${SIGNUP_OTP}`, {
          replace: true,
          state: { data: email?.toLowerCase() },
        });

  const onSignUpError = (err: AxiosError<ErrorHttpResponse>) => {
    console.log('onLoginError');
    toast.error(err?.response?.data?.message ?? 'Something went wrong');
  };

  const signupUser = (data: Signupdata) => {
    const url: HttpConfig = {
      url: 'auth-service/users/signup',
      method: 'post',
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        isTermsAccepted: data.isTermsAccepted,
      },
    };

    request(url, onSigupSuccess(data.email), setLoading, onSignUpError);
  };

  return {
    loading,
    signupUser,
  };
};

export default useUserSignup;
