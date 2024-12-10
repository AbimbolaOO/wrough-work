import { AxiosError } from 'axios';
import { useState } from 'react';

import { ILocumUserData } from '../../../models/auth/signIn.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import { authActions } from '../../../redux/slices/authSlice';
import { useAppDisPatch, useAppSelector } from '../../../redux/store';
import useHttps from '../../useHttps';

const useGetUserData = () => {
  const request = useHttps();
  const { authData } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDisPatch();

  const onGetUserDataError = (err: AxiosError<ErrorHttpResponse>) => {
    console.error(err?.message ?? "Something when wrong while updating user data");
  };

  const onGetUserDataSuccess = ({
    data,
    message,
  }: SuccessHttpResponse<ILocumUserData>) => {
    const updateAuthData = { ...authData, ...data };

    dispatch(
      authActions.setAuthData(updateAuthData)
    );

    localStorage.setItem('authData', JSON.stringify(updateAuthData));
  };

  const getUserData = async (): Promise<void> => {
    const url: HttpConfig = {
      url: `auth-service/users/${authData?.id}`,
      method: 'get',
    };

    return await request(url, onGetUserDataSuccess, setLoading, onGetUserDataError);
  };


  return {
    loading,
    getUserData,
  };
};

export default useGetUserData;
