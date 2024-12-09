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
import useGetUserData from "./useGetUserData";

const useGetAllAppsForUser = () => {
  const { userData } = useGetUserData();
  const [userAppsData, setUserAppsData] = useState<jobAppDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const request = useHttps();

  // Fetch the job data function
  const fetchJob = useCallback(() => {
    if (!userData) return; // Move the check inside fetchJob

    const url: HttpConfig = {
      url: `jobs-service/applications`,
      method: "get",
    };

    const onSuccess = ({ data }: SuccessHttpResponse<jobAppDataType[]>) => {
      setUserAppsData(data.reverse()); // Set the single job object
    };

    const onError = (err: AxiosError<ErrorHttpResponse>) => {
      console.log("onGetJobError");
      toast.error(err?.response?.data?.message ?? "Failed to get job data");
    };

    request(url, onSuccess, setLoading, onError);
  }, [request, userData]);

  // Fetch the job data on initial load
  useEffect(() => {
    if (userData) {
      fetchJob();
    }
  }, [fetchJob, userData]);

  return {
    loading,
    userAppsData,
    refetch: fetchJob, // Expose the fetchJob function as refetch
  };
};

export default useGetAllAppsForUser;
