import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { ProfileImageDataType } from '../../../../models/dashboard/settings/profileSettings/profileImage.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../../models/https';
import { useAppSelector } from '../../../../redux/store';
import useHttps from '../../../useHttps';
import useGetUserData from '../useGetUserData';

const useUploadProfileImage = () => {
  const { authData } = useAppSelector((state) => state.auth);
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const { getUserData } = useGetUserData();

  const onUploadProfileImageError = (err: AxiosError<ErrorHttpResponse>) => {
    toast.error(
      err?.response?.data?.message ?? 'Something went wrong while uploading profile image'
    );
  };

  const onUploadProfileImageSuccess = ({
    data,
    message,
  }: SuccessHttpResponse<any>) => {
    toast.success(message);
    getUserData();
  };


  const uploadProfileImage = (data: ProfileImageDataType) => {
    const formData = new FormData();

    if (data.profileImage instanceof File) {
      formData.append(
        'profileImage',
        data.profileImage
      );
    }

    const url: HttpConfig = {
      url: `auth-service/users/${authData?.id}`,
      method: 'put',
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    request(url, onUploadProfileImageSuccess, setLoading, onUploadProfileImageError);
  };

  return { uploadProfileImage, loading };
};

export default useUploadProfileImage;
