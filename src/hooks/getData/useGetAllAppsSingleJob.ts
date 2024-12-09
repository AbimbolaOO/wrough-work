import { AxiosError } from "axios";
import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import useHttps from "../useHttps";
import {
  SuccessHttpResponse,
  ErrorHttpResponse,
  HttpConfig,
} from "../../models/https";
import { jobAppDataType } from "../../models/jobApp/jobApp.model";

const useGetAllAppsSingleJob = (jobId?: string, silent?: boolean) => {
  const [appsData, setAppsData] = useState<jobAppDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const request = useHttps();

  // Fetch the job data function
  const fetchJob = useCallback(() => {
    if (!jobId) return; // Exit early if no jobId is provided

    const url: HttpConfig = {
      url: `jobs-service/jobs/${jobId}/applicants`,
      method: "get",
    };

    const onSuccess = ({ data }: SuccessHttpResponse<jobAppDataType[]>) => {
      setAppsData(data); // Set the single job object
    };

    const onError = (err: AxiosError<ErrorHttpResponse>) => {
      console.log("onGetJobError");
      !silent &&
        toast.error(err?.response?.data?.message ?? "Failed to get job data");
    };

    request(url, onSuccess, setLoading, onError);
  }, [jobId, request, silent]);

  // Fetch the job data on initial load
  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  console.log(appsData);

  return {
    loading,
    appsData,
    refetch: fetchJob, // Expose the fetchJob function as refetch
  };
};

export default useGetAllAppsSingleJob;
