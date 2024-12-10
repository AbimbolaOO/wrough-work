import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { BasicInfoDataType } from '../../../../models/dashboard/settings/profileSettings/basicInformation.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../../models/https';
import { useAppSelector } from '../../../../redux/store';
import useHttps from '../../../useHttps';
import useGetUserData from '../useGetUserData';

const useUpdateBasicInformation = () => {
  const { authData } = useAppSelector((state) => state.auth);
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const { getUserData } = useGetUserData();

  const onUpdateBasicInfoError = (err: AxiosError<ErrorHttpResponse>) => {
    toast.error(
      err?.response?.data?.message ?? 'Something went wrong while updating basic information'
    );
  };

  const onUpdateBasicInfoSuccess = ({
    data,
    message,
  }: SuccessHttpResponse<any>) => {
    toast.success(message);
    getUserData();
  };


  const updateBasicInfo = (data: BasicInfoDataType) => {
    const url: HttpConfig = {
      url: `auth-service/users/${authData?.id}`,
      method: 'put',
      data,
    };
    request(url, onUpdateBasicInfoSuccess, setLoading, onUpdateBasicInfoError);
  };

  return { updateBasicInfo, loading };

};



export default useUpdateBasicInformation;
