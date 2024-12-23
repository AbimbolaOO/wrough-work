import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { ICreateJobInterviewData } from '../../../models/dashboard/jobs/createJobInterview.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import { useAppSelector } from '../../../redux/store';
import useHttps from '../../useHttps';

const useCreateJobInterviewTime = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const { authData } = useAppSelector((state) => state.auth);

  const onCreateJobPostInterviewTimeError = (err: AxiosError<ErrorHttpResponse>) => {
    toast.error(
      err?.response?.data?.message ?? 'Something setting job interview time'
    );
  };

  const onCreateJobPostInterviewTimeSuccess = ({
    data,
    message,
  }: SuccessHttpResponse<any>) => {
    toast.success(message);

  };


  const createJobPostInterviewTime = (data: ICreateJobInterviewData) => {
    const url: HttpConfig = {
      url: `jobs-service/applications/${authData?.id}/interviews`,
      method: 'post',
      data,
    };

    request(url, onCreateJobPostInterviewTimeSuccess, setLoading, onCreateJobPostInterviewTimeError);
  };

  return { createJobPostInterviewTime, loading };
};

export default useCreateJobInterviewTime;


