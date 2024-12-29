import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { ExperienceDataType } from '../../../../models/dashboard/settings/profileSettings/experience.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../../models/https';
import { useAppSelector } from '../../../../redux/store';
import { employmentTypeDict } from '../../../../utils/utils';
import useHttps from '../../../useHttps';
import useGetUserData from '../useGetUserData';

const useCreateExperience = () => {
  const { authData } = useAppSelector((state) => state.auth);
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const { getUserData } = useGetUserData();

  const onCreateExperienceError = (err: AxiosError<ErrorHttpResponse>) => {
    toast.error(
      err?.response?.data?.message ?? 'Something went wrong while adding experience data'
    );
  };

  const onCreateExperienceSuccess = (resetFormFn: (...args: any) => void) => ({
    data,
    message,
  }: SuccessHttpResponse<any>) => {
    toast.success(message);
    getUserData();
    resetFormFn();
  };


  const createExperience = (data: ExperienceDataType, resetFormFn: (...args: any) => void) => {
    const formData = new FormData();

    if (data.otherQualification) {
      formData.append('otherQualification', data.otherQualification);
    }

    if (data.employmentType) {
      formData.append('employmentType', employmentTypeDict[data.employmentType]);
    }

    if (data.yearOfQualification) {
      const yearOfQualification =
        data.yearOfQualification instanceof Date
          ? data.yearOfQualification.toISOString()
          : data.yearOfQualification;
      formData.append('yearOfQualification', yearOfQualification);
    }

    if (data.qualificationCertificate instanceof File) {
      formData.append(
        'qualificationCertificate',
        data.qualificationCertificate
      );
    }

    formData.append('title', data.title);
    formData.append('companyName', data.companyName);
    formData.append('location', data.location);
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);



    const url: HttpConfig = {
      url: `auth-service/users/${authData?.id}/experiences`,
      method: 'post',
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    request(url, onCreateExperienceSuccess(resetFormFn), setLoading, onCreateExperienceError);
  };

  return { createExperience, loading };
};

export default useCreateExperience;
