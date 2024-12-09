import { AxiosError } from "axios";
import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import useHttps from "../useHttps";
import {
  SuccessHttpResponse,
  ErrorHttpResponse,
  HttpConfig,
} from "../../models/https";
import { JobPostingDataTypeGet } from "../../models/jobPosting/jobPosting.model";

const useGetSingleJob = (jobId?: string) => {
  const [jobData, setJobData] = useState<JobPostingDataTypeGet | null>(null);
  const [loading, setLoading] = useState(false);
  const request = useHttps();

  // Fetch the job data function
  const fetchJob = useCallback(() => {
    if (!jobId) return; // Exit early if no jobId is provided

    const url: HttpConfig = {
      url: `jobs-service/jobs/${jobId}`,
      method: "get",
    };

    const onSuccess = ({ data }: SuccessHttpResponse<JobPostingDataTypeGet>) => {
      setJobData(data); // Set the single job object
      // toast.success("Job fetched successfully!");
    };

    const onError = (err: AxiosError<ErrorHttpResponse>) => {
      console.log("onGetJobError");
      toast.error(err?.response?.data?.message ?? "Failed to get job data");
    };

    request(url, onSuccess, setLoading, onError);
  }, [jobId, request]);

  // Fetch the job data on initial load
  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  return {
    loading,
    jobData,
    refetch: fetchJob, // Expose the fetchJob function as refetch
  };
};

export default useGetSingleJob;
