import { AxiosError } from 'axios';
import { useState } from 'react';

import { ILocumJobs } from '../../../models/dashboard/jobs/getLocumJobs.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import { jobApplicationsActions } from '../../../redux/slices/jobApplicationsSlice';
import { useAppDisPatch, useAppSelector } from '../../../redux/store';
import useHttps from '../../useHttps';

const useGetJobApplications = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const { authData } = useAppSelector((state) => state.auth);
  const dispatch = useAppDisPatch();

  const onGetJobApplicationsError = (err: AxiosError<ErrorHttpResponse>) => {
    console.error(err?.message ?? "Something when wrong while fetching jobs");
  };

  const onGetJobApplicationsSuccess = ({
    data,
    message,
  }: SuccessHttpResponse<ILocumJobs[]>) => {
    dispatch(jobApplicationsActions.getJobApplications({ page: 1, perPage: 10, jobData: data }));
  };


  const getJobApplications = (filter?: string) => {
    const url: HttpConfig = {
      url: `jobs-service/jobs/institutions/${authData?.id}/jobs`,
      method: 'get',
    };

    return request(url, onGetJobApplicationsSuccess, setLoading, onGetJobApplicationsError);
  };

  return { getJobApplications, loading };
};

export default useGetJobApplications;
