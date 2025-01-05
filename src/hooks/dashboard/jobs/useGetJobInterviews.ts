import { AxiosError } from 'axios';
import { useState } from 'react';

import { IApplicantData } from '../../../models/dashboard/jobs/singleJobApplicants.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import useHttps from '../../useHttps';

const useGetJobInterviews = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const [interviews, setInterviews] = useState<any>();

  const onGetJobInterviewError = (err: AxiosError<ErrorHttpResponse>) => {
    console.error(err?.message ?? "Something when wrong while fetching jobs");
  };

  const onGetJobInterviewSuccess = ({
    data,
    message,
  }: SuccessHttpResponse<IApplicantData[]>) => {
    console.log("data--><>>", data);
    setInterviews(data);
  };


  const getJobInterviews = (jobId: string) => {
    const url: HttpConfig = {
      url: `jobs-service/jobs/${jobId}/interviews?limit=10&offset=1`,
      method: 'get',
    };

    return request(url, onGetJobInterviewSuccess, setLoading, onGetJobInterviewError);
  };

  return { getJobInterviews, loading, interviews };
};

export default useGetJobInterviews;


