import { AxiosError } from 'axios';
import { useState } from 'react';

import { IApplicantData } from '../../../models/dashboard/jobs/singleJobApplicants.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import useHttps from '../../useHttps';

const useGetJobApplicantsForScreening = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const [applicantData, setApplicantData] = useState<any>();


  const onGetJobApplicantsForScreeningError = (err: AxiosError<ErrorHttpResponse>) => {
    console.error(err?.message ?? "Something when wrong while fetching jobs applicants");
  };

  const onGetJobApplicantsForScreeningSuccess = ({
    data,
    message,
  }: SuccessHttpResponse<IApplicantData[]>) => {
    setApplicantData(data);
  };


  const getSingleJobApplicantForScreening = (jobId: string) => {
    const url: HttpConfig = {
      url: `jobs-service/jobs/${jobId}/applicants`,
      method: 'get',
    };

    return request(url, onGetJobApplicantsForScreeningSuccess, setLoading, onGetJobApplicantsForScreeningError);
  };

  return { getSingleJobApplicantForScreening, loading, applicantData };
};

export default useGetJobApplicantsForScreening;


