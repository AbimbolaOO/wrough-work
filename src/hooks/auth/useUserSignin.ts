import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { ILocumUserData, LocumSignInDataType } from '../../models/auth/signIn.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../models/https';
import { authActions } from '../../redux/slices/authSlice';
import { useAppDisPatch } from '../../redux/store';
import useHttps from '../useHttps';

const useUserSignin = () => {
  const navigate = useNavigate();
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDisPatch();

  const setAuthentication = ({ data }: SuccessHttpResponse<ILocumUserData>) => {
    dispatch(
      authActions.setAuthentication({ authData: data, isAuthenticated: true })
    );
    localStorage.setItem('authData', JSON.stringify(data));
    navigate('/', { replace: true });
  };

  const onSignInError = (err: AxiosError<ErrorHttpResponse>) => {
    console.log('onLoginError');
    toast.error(err?.response?.data?.message ?? 'Something went wrong');
  };

  const signinUser = (data: LocumSignInDataType) => {
    const url: HttpConfig = {
      url: 'auth-service/users/signin',
      method: 'post',
      data,
    };

    request(url, setAuthentication, setLoading, onSignInError);
  };

  return {
    loading,
    signinUser,
  };
};

export default useUserSignin;
