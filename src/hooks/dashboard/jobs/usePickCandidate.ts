import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { PickCandidateDataType } from '../../../models/dashboard/jobs/pickCandidate';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import useHttps from '../../useHttps';

const usePickCandidate = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);

  const onPickCandidateError = (err: AxiosError<ErrorHttpResponse>) => {
    toast.error(
      err?.response?.data?.message ?? 'Something went wrong while creating picking candidate'
    );
  };

  const onPickCandidateSuccess = ({
    data,
    message,
  }: SuccessHttpResponse<any>) => {
    toast.success(message);
  };


  const pickCandidate = (data: PickCandidateDataType) => {
    const url: HttpConfig = {
      url: `jobs-service/jobs`,
      method: 'post',
      data,
    };

    request(url, onPickCandidateSuccess, setLoading, onPickCandidateError);
  };

  return { pickCandidate, loading };
};

export default usePickCandidate;


