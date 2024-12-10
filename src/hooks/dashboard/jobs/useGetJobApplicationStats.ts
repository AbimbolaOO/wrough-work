import { AxiosError } from 'axios';
import { useState } from 'react';

import { IGetJobApplicationStats } from '../../../models/dashboard/jobs/jobApplicationStats.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import { jobApplicationStatsActions } from '../../../redux/slices/jobApplicationStatsSlice';
import { useAppDisPatch } from '../../../redux/store';
import useHttps from '../../useHttps';

const useGetJobApplicationStats = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDisPatch();

  const onGetJobApplicationStatsError = (err: AxiosError<ErrorHttpResponse>) => {
    console.error(err?.message ?? "Something when wrong while fetching created jobs list");
  };

  const onGetJobApplicationStatsSuccess = ({
    data,
    message,
  }: SuccessHttpResponse<IGetJobApplicationStats>) => {
    dispatch(jobApplicationStatsActions.jobApplicationStats(data));
  };


  const getJobApplicationStats = async (): Promise<void> => {
    const url: HttpConfig = {
      url: `jobs-service/applications/stats`,
      method: 'get',
    };

    return await request(url, onGetJobApplicationStatsSuccess, setLoading, onGetJobApplicationStatsError);
  };

  return { getJobApplicationStats, loading };

};

export default useGetJobApplicationStats;



