import { AxiosError } from 'axios';
import { useState } from 'react';

import { ILocumJobs } from '../../../models/dashboard/jobs/getLocumJobs.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import { locumJobsActions } from '../../../redux/slices/locumJobsSlice';
import { useAppDisPatch } from '../../../redux/store';
import useHttps from '../../useHttps';

const useGetLocumJobs = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);
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


  const getLocumJobs = (filter?: Record<string, string>) => {
    let urlPath = `jobs-service/jobs`;

    // if (filter && Object.keys(filter).length !== 0) {
    //   urlPath = urlPath; //TODO:: comeback an enhance this feature
    // }

    const url: HttpConfig = {
      url: urlPath,
      method: 'get',
    };

    return request(url, onGetLocumJobsSuccess, setLoading, onGetLocumJobsError);
  };

  return { getLocumJobs, loading };
};

export default useGetLocumJobs;
