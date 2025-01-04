import { AxiosError } from 'axios';
import { useState } from 'react';

import { IActiveShifts } from '../../../models/dashboard/jobs/getActiveShifts.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import { jobApplicationsActions } from '../../../redux/slices/jobApplicationsSlice';
import { useAppDisPatch } from '../../../redux/store';
import useHttps from '../../useHttps';

const useGetJobApplications = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDisPatch();

  const onGetJobApplicationsError = (err: AxiosError<ErrorHttpResponse>) => {
    console.error(err?.message ?? "Something when wrong while fetching jobs");
  };

  const onGetJobApplicationsSuccess = ({
    data,
    message,
  }: SuccessHttpResponse<IActiveShifts[]>) => {
    console.log("data--><>>", data);
    dispatch(jobApplicationsActions.getJobApplications({ page: 1, perPage: 10, jobData: data }));
  };


  const getJobApplications = (filter?: string) => {
    const url: HttpConfig = {
      // url: `jobs-service/jobs/institutions/${authData?.id}/jobs`,
      url: `jobs-service/applications`,
      method: 'get',
    };

    return request(url, onGetJobApplicationsSuccess, setLoading, onGetJobApplicationsError);
  };

  return { getJobApplications, loading };
};

export default useGetJobApplications;
