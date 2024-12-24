import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { ApplyToJobPostWithResumeDataType } from '../../../models/dashboard/jobs/applyToJobPostWithResume.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import { useAppSelector } from '../../../redux/store';
import useHttps from '../../useHttps';

const useApplyToJobPostWithResume = () => {
  const { authData } = useAppSelector((state) => state.auth);
  const request = useHttps();
  const [loading, setLoading] = useState(false);

  const onApplyToJobPostWithResumeError = (err: AxiosError<ErrorHttpResponse>) => {
    toast.error(
      err?.response?.data?.message ?? 'Something went wrong while creating job'
    );
  };

  const onApplyToJobPostWithResumeSuccess = (resetFormFn: (...args: any) => void) => ({
    data,
    message,
  }: SuccessHttpResponse<any>) => {
    toast.success(message);
    resetFormFn();
  };


  const applyToJobPostWithResume = (data: ApplyToJobPostWithResumeDataType, jobId: string, resetFormFn: (...args: any) => void) => {
    const formData = new FormData();

    formData.append('firstName', authData?.firstName ?? '');
    formData.append('lastName', authData?.lastName ?? '');
    formData.append('email', authData?.email ?? '');
    formData.append('jobId', jobId);
    if (data.resumeFile instanceof File) {
      formData.append('resume', data.resumeFile);
    }
    // formData.append('resumeUrl', data.resumeUrl); //For Future enhancement

    const url: HttpConfig = {
      url: `jobs-service/applications`,
      method: 'post',
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    request(url, onApplyToJobPostWithResumeSuccess(resetFormFn), setLoading, onApplyToJobPostWithResumeError);
  };

  return { applyToJobPostWithResume, loading };
};

export default useApplyToJobPostWithResume;


