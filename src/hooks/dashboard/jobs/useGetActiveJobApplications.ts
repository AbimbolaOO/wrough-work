import { AxiosError } from 'axios';
import { useState } from 'react';

import { IJobApplications } from '../../../models/dashboard/jobs/getAllJobApplications.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import { useAppSelector } from '../../../redux/store';
// import { useAppDisPatch } from '../../../redux/store';
import useHttps from '../../useHttps';

const useGetActiveJobApplications = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const { authData } = useAppSelector((state) => state.auth);
  // const dispatch = useAppDisPatch();

  const onGetActiveJobApplicationsError = (err: AxiosError<ErrorHttpResponse>) => {
    console.error(err?.message ?? "Something when wrong while fetching active jobs");
  };

  const onGetActiveJobApplicationsSuccess = ({
    data,
    message,
  }: SuccessHttpResponse<IJobApplications[]>) => {
    // dispatch(jobActiveShiftActions.getJobActiveShift(data));
  };


  const getActiveJobApplications = (page?: string) => {
    const url: HttpConfig = {
      url: `jobs-service/jobs/institutions/${authData?.id}/jobs`,
      method: 'get',
    };

    return request(url, onGetActiveJobApplicationsSuccess, setLoading, onGetActiveJobApplicationsError);
  };

  return { getActiveJobApplications, loading };
};

export default useGetActiveJobApplications;
