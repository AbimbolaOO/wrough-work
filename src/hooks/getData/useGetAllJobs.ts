import { AxiosError } from "axios";
import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import useGetUserId from "../id/useGetUserId";
import useHttps from "../useHttps";
import {
  SuccessHttpResponse,
  ErrorHttpResponse,
  HttpConfig,
} from "../../models/https";
import { JobPostingDataTypeGet } from "../../models/jobPosting/jobPosting.model";

const useGetAllJobs = () => {
  const { userId } = useGetUserId();
  const [allJobsData, setAllJobsData] = useState<JobPostingDataTypeGet[]>([]);
  const [loading, setLoading] = useState(false);
  const request = useHttps();

  // Fetch the jobs data function
  const fetchAllJobs = useCallback(() => {
    if (!userId) return; // Exit early if no userId is provided

    const url: HttpConfig = {
      url: `jobs-service/jobs`,
      method: "get",
    };

    const onSuccess = ({
      data,
    }: SuccessHttpResponse<JobPostingDataTypeGet[]>) => {
      setAllJobsData(data.reverse()); // Set the jobs data array and start from the latest
    };

    const onError = (err: AxiosError<ErrorHttpResponse>) => {
      if (err?.response?.status === 404 || allJobsData.length === 0) {
        setAllJobsData([]);
      } else {
        toast.error(
          err?.response?.data?.message ?? "Failed to get all jobs data"
        );
      }
    };

    request(url, onSuccess, setLoading, onError);
  }, [userId, request, allJobsData.length]);

  // Fetch the jobs data on initial load or when userId changes
  useEffect(() => {
    fetchAllJobs();
  }, [fetchAllJobs]);

  return {
    loading,
    allJobsData,
    refetch: fetchAllJobs, // Expose the fetchJobs function as refetch
  };
};

export default useGetAllJobs;
