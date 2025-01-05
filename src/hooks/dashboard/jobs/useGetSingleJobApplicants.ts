import { AxiosError } from 'axios';
import { useState } from 'react';

import { IApplicantData } from '../../../models/dashboard/jobs/singleJobApplicants.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import useHttps from '../../useHttps';

const useGetSingleJobApplicants = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const [applicantData, setApplicantData] = useState<any>();
  // const dispatch = useAppDisPatch();

  const onGetSingleJobApplicantsError = (err: AxiosError<ErrorHttpResponse>) => {
    console.error(err?.message ?? "Something when wrong while fetching jobs");
  };

  const onGetSingleJobApplicantsSuccess = ({
    data,
    message,
  }: SuccessHttpResponse<IApplicantData[]>) => {
    console.log("data--><>>", data);
    setApplicantData(data);
  };


  const getSingleJobApplicant = (jobId: string) => {
    const url: HttpConfig = {
      url: `jobs-service/jobs/${jobId}/applicants`,
      method: 'get',
    };

    return request(url, onGetSingleJobApplicantsSuccess, setLoading, onGetSingleJobApplicantsError);
  };

  return { getSingleJobApplicant, loading, applicantData };
};

export default useGetSingleJobApplicants;


