import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { VerificationDataType } from '../../../../models/dashboard/settings/profileSettings/verification.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../../models/https';
import { useAppSelector } from '../../../../redux/store';
import useHttps from '../../../useHttps';
import useGetUserData from '../useGetUserData';

const useCreateVerification = () => {
  const { authData } = useAppSelector((state) => state.auth);
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const { getUserData } = useGetUserData();

  const onCreateVerificationError = (err: AxiosError<ErrorHttpResponse>) => {
    toast.error(
      err?.response?.data?.message ?? 'Something went wrong while adding verification data'
    );
  };

  const onCreateVerificationSuccess = ({
    data,
    message,
  }: SuccessHttpResponse<any>) => {
    toast.success(message);
    getUserData();
  };


  // const createVerification = (data: VerificationDataType) => {
  const createVerification = (data: VerificationDataType) => {
    const formData = new FormData();

    const yearOfCurrentLicense =
      data.yearOfCurrentLicense instanceof Date
        ? data.yearOfCurrentLicense.toISOString().split('T')[0]
        : data.yearOfCurrentLicense;

    formData.append('yearOfCurrentLicense', yearOfCurrentLicense);
    formData.append('primaryDegreeName', data.primaryDegreeName);
    formData.append('validationNumber', data.validationNumber);

    if (data.license instanceof File) {
      formData.append('license', data.license);
    }

    if (data.primaryDegreeCertificate instanceof File) {
      formData.append(
        'primaryDegreeCertificate',
        data.primaryDegreeCertificate
      );
    }

    const url: HttpConfig = {
      url: `auth-service/users/${authData?.id}/verifications`,
      method: 'post',
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    request(url, onCreateVerificationSuccess, setLoading, onCreateVerificationError);
  };

  return { createVerification, loading };
};

export default useCreateVerification;
