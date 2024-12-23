import { AxiosError } from 'axios';
import { useState } from 'react';

import { ILocumJobs } from '../../../models/dashboard/jobs/getLocumJobs.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import { locumSingleJobsActions } from '../../../redux/slices/locumSingleJobSlice';
import { useAppDisPatch } from '../../../redux/store';
import useHttps from '../../useHttps';

const useGetSingleLocumJob = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDisPatch();

  const onGetSingleLocumJobError = (err: AxiosError<ErrorHttpResponse>) => {
    console.error(err?.message ?? "Something when wrong while fetching single locum jobs");
  };

  const onGetSingleLocumJobSuccess = (jobId: string) => ({
    data,
    message,
  }: SuccessHttpResponse<ILocumJobs>) => {
    dispatch(locumSingleJobsActions.getSingleLocumJobs({ jobId, jobData: data }));
  };


  const getSingleLocumJob = (jobId: string) => {
    let urlPath = `jobs-service/jobs/${jobId}`;

    const url: HttpConfig = {
      url: urlPath,
      method: 'get',
    };

    return request(url, onGetSingleLocumJobSuccess(jobId), setLoading, onGetSingleLocumJobError);
  };

  return { getSingleLocumJob, loading };
};

export default useGetSingleLocumJob;
