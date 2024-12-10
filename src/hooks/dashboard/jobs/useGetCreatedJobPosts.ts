import { AxiosError } from 'axios';
import { useState } from 'react';

import { IGetCreatedJobs } from '../../../models/dashboard/jobs/getCreatedJobs.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import { jobCreatedListActions } from '../../../redux/slices/jobCreatedListSlice';
import { useAppDisPatch } from '../../../redux/store';
import useHttps from '../../useHttps';

const useGetCreatedJobPosts = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDisPatch();


  const onGetCreatedJobPostsError = (err: AxiosError<ErrorHttpResponse>) => {
    console.error(err?.message ?? "Something when wrong while fetching job application stats");
  };

  const onGetCreatedJobPostsSuccess = ({
    data,
    message,
  }: SuccessHttpResponse<IGetCreatedJobs[]>) => {
    dispatch(jobCreatedListActions.getJobCreatedList(data));
  };


  const getCreatedJobPosts = async (userId: string): Promise<void> => {
    const url: HttpConfig = {
      url: `jobs-service/jobs/institutions/${userId}/jobs`,
      method: 'get',
    };

    return await request(url, onGetCreatedJobPostsSuccess, setLoading, onGetCreatedJobPostsError);
  };

  return { getCreatedJobPosts, loading };
};

export default useGetCreatedJobPosts;
