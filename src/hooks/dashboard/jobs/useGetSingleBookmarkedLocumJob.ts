import { AxiosError } from 'axios';
import { useState } from 'react';

import { ILocumJobs } from '../../../models/dashboard/jobs/getLocumJobs.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import { locumSingleBookmarkJobsActions } from '../../../redux/slices/locumSingleBookmarkJobSlice';
import { useAppDisPatch } from '../../../redux/store';
import useHttps from '../../useHttps';

const useGetSingleBookmarkedLocumJob = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDisPatch();

  const onGetSingleBookmarkedLocumJobError = (err: AxiosError<ErrorHttpResponse>) => {
    console.error(err?.message ?? "Something when wrong while fetching single locum jobs");
  };

  const onGetSingleBookmarkedLocumJobSuccess = (jobId: string) => ({
    data,
    message,
  }: SuccessHttpResponse<ILocumJobs>) => {
    dispatch(locumSingleBookmarkJobsActions.getSingleLocumBookmarkJobs({ jobId, bookmarkJobData: data }));
  };


  const getSingleBookmarkedLocumJob = (jobId: string) => {
    let urlPath = `jobs-service/jobs/${jobId}`;

    const url: HttpConfig = {
      url: urlPath,
      method: 'get',
    };

    return request(url, onGetSingleBookmarkedLocumJobSuccess(jobId), setLoading, onGetSingleBookmarkedLocumJobError);
  };

  return { getSingleBookmarkedLocumJob, loading };
};

export default useGetSingleBookmarkedLocumJob;
