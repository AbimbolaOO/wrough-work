import { AxiosError } from 'axios';
import { useState } from 'react';

import { IBookmarkLocumJobs } from '../../../models/dashboard/jobs/getBookmarkedLocumJobs.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import { bookmarkedLocumJobsActions } from '../../../redux/slices/bookmarkedLocumJobsSlice';
import { useAppDisPatch } from '../../../redux/store';
import useHttps from '../../useHttps';

const useGetBookmarkedLocumJobs = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDisPatch();

  const onGetBookmarkedLocumJobsError = (err: AxiosError<ErrorHttpResponse>) => {
    console.error(err?.message ?? "Something when wrong while fetching locum jobs");
  };

  const onGetBookmarkedLocumJobsSuccess = ({
    data,
    message,
  }: SuccessHttpResponse<IBookmarkLocumJobs[]>) => {
    dispatch(bookmarkedLocumJobsActions.getBookmarkedLocumJobs({ page: 1, perPage: 10, bookmarkJobData: data }));
  };


  const getBookmarkedLocumJobs = (filter?: Record<string, string>) => {
    let urlPath = `jobs-service/bookmarks`;

    const url: HttpConfig = {
      url: urlPath,
      method: 'get',
    };

    return request(url, onGetBookmarkedLocumJobsSuccess, setLoading, onGetBookmarkedLocumJobsError);
  };

  return { getBookmarkedLocumJobs, loading };
};

export default useGetBookmarkedLocumJobs;
