import { AxiosError } from 'axios';
import { useState } from 'react';

import { IJobApplications } from '../../../models/dashboard/jobs/getAllJobApplications.model';
import { ILocumJobs } from '../../../models/dashboard/jobs/getLocumJobs.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import { locumJobsActions } from '../../../redux/slices/locumJobsSlice';
import { useAppDisPatch, useAppSelector } from '../../../redux/store';
import useHttps from '../../useHttps';

const useGetLocumJobs = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const { authData } = useAppSelector((state) => state.auth);
  const dispatch = useAppDisPatch();

  const onGetLocumJobsError = (err: AxiosError<ErrorHttpResponse>) => {
    console.error(err?.message ?? "Something when wrong while fetching locum jobs");
  };

  const onGetLocumJobsSuccess = ({
    data,
    message,
  }: SuccessHttpResponse<ILocumJobs[]>) => {
    dispatch(locumJobsActions.getLocumJobs({ page: 1, perPage: 10, jobData: data }));
  };


  const getLocumJobs = (filter?: string) => {
    const url: HttpConfig = {
      url: `jobs-service/jobs/institutions/${authData?.id}/jobs`,
      method: 'get',
    };

    return request(url, onGetLocumJobsSuccess, setLoading, onGetLocumJobsError);
  };

  return { getLocumJobs, loading };
};

export default useGetLocumJobs;
