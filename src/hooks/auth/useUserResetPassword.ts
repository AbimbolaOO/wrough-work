import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { ResetPaswdDataType } from '../../models/auth/resetPassword.model';
import {
  ErrorHttpResponse,
  HttpConfig,
  SuccessHttpResponse,
} from '../../models/https';
import { ACCOUNT, FORGOT_PASSWORD_SUCCESS } from '../../routes/routeConstants';
import useHttps from '../useHttps';

const useUserResetPassword = () => {
  const navigate = useNavigate();
  const request = useHttps();
  const [loading, setLoading] = useState(false);

  const onResetPasswordError = (err: AxiosError<ErrorHttpResponse>) => {
    console.log('onResetPasswordError');
    toast.error(err?.response?.data?.message ?? 'Something went wrong');
  };

  const onResetUserPassword = (_: SuccessHttpResponse<any>) => {
    navigate(`/${ACCOUNT}/${FORGOT_PASSWORD_SUCCESS}`, {
      replace: true,
    });
  };

  const resetUserPassword = (data: ResetPaswdDataType) => {
    const url: HttpConfig = {
      url: 'auth-service/users/reset-password',
      method: 'post',
      data,
    };

    request(url, onResetUserPassword, setLoading, onResetPasswordError);
  };

  return {
    loading,
    resetUserPassword,
  };
};

export default useUserResetPassword;
