import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { CreateJobPostDataType } from '../../../models/dashboard/jobs/createJobPost.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import useHttps from '../../useHttps';

const useCreateJobPost = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);

  const onCreateJobPostError = (err: AxiosError<ErrorHttpResponse>) => {
    toast.error(
      err?.response?.data?.message ?? 'Something went wrong while creating job'
    );
  };

  const onCreateJobPostSuccess = (resetFormFn: (...args: any) => void) => ({
    data,
    message,
  }: SuccessHttpResponse<any>) => {
    toast.success(message);
    resetFormFn();
  };


  const createJobPost = (data: CreateJobPostDataType, resetFormFn: (...args: any) => void) => {
    const url: HttpConfig = {
      url: `jobs-service/jobs`,
      method: 'post',
      data,
    };

    request(url, onCreateJobPostSuccess(resetFormFn), setLoading, onCreateJobPostError);
  };

  return { createJobPost, loading };
};

export default useCreateJobPost;


