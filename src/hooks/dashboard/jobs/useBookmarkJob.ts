import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import useHttps from '../../useHttps';

const useBookmarkJob = () => {
    const request = useHttps();
    const [loading, setLoading] = useState(false);

    const onBookmarkJobError = (err: AxiosError<ErrorHttpResponse>) => {
        toast.error(
            err?.response?.data?.message ?? 'Something while bookmarking job'
        );
    };

    const onBookmarkJobSuccess = ({
        data,
        message,
    }: SuccessHttpResponse<any>) => {
        toast.success(message);
    };


    const bookmarkJob = (jobId: string) => {
        const url: HttpConfig = {
            url: `jobs-service/bookmarks`,
            method: 'post',
            data: { jobId },
        };

        request(url, onBookmarkJobSuccess, setLoading, onBookmarkJobError);
    };

    return { bookmarkJob, loading };
};

export default useBookmarkJob;


