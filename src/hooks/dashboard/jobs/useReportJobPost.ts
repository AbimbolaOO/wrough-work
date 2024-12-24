import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { ReportJobPostDataType } from '../../../models/dashboard/jobs/reportJobPost.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import useHttps from '../../useHttps';

const useReportJobPost = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);

  const onReportJobPostError = (err: AxiosError<ErrorHttpResponse>) => {
    toast.error(
      err?.response?.data?.message ?? 'Something went wrong while creating job'
    );
  };

  const onReportJobPostSuccess = (resetFormFn: (...args: any) => void) => ({
    data,
    message,
  }: SuccessHttpResponse<any>) => {
    toast.success(message);
    resetFormFn();
  };


  const reportJobPost = (data: ReportJobPostDataType, resetFormFn: (...args: any) => void) => {
    const url: HttpConfig = {
      url: `jobs-service/jobs`,
      method: 'post',
      data,
    };

    request(url, onReportJobPostSuccess(resetFormFn), setLoading, onReportJobPostError);
  };

  return { reportJobPost, loading };
};

export default useReportJobPost;


