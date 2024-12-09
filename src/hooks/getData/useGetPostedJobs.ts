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

const useGetJobs = () => {
  const { userId } = useGetUserId();
  const [jobsData, setJobsData] = useState<JobPostingDataTypeGet[]>([]);
  const [loading, setLoading] = useState(false);
  const request = useHttps();

  // Fetch the jobs data function
  const fetchJobs = useCallback(() => {
    if (!userId) return; // Exit early if no userId is provided

    const url: HttpConfig = {
      url: `jobs-service/jobs/institutions/${userId}/jobs`,
      method: "get",
    };

    const onSuccess = ({
      data,
    }: SuccessHttpResponse<JobPostingDataTypeGet[]>) => {
      setJobsData(data.reverse()); // Set the jobs data array
      // toast.success("Jobs fetched successfully!");
    };

    const onError = (err: AxiosError<ErrorHttpResponse>) => {
      if (err?.response?.status === 404 || jobsData.length === 0) {
        // No jobs found for the current institution is not an error if the list is empty
        setJobsData([]); // Clear the job list
      } else {
        toast.error(err?.response?.data?.message ?? "Failed to get jobs data");
      }
    };

    request(url, onSuccess, setLoading, onError);
  }, [userId, request, jobsData.length]);

  // Fetch the jobs data on initial load or when userId changes
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    loading,
    jobsData,
    refetch: fetchJobs, // Expose the fetchJobs function as refetch
  };
};

export default useGetJobs;
