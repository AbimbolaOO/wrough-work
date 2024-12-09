import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useHttps from "../useHttps";
import {
  SuccessHttpResponse,
  ErrorHttpResponse,
  HttpConfig,
} from "../../models/https";
import { jobAppDataType } from "../../models/jobApp/jobApp.model";
import useGetAllAppsSingleJob from "../getData/useGetAllAppsSingleJob";
import usePatchSingleJob from "./usePatchSingleJob";

const usePatchAppStatus = (jobId: string) => {
  const [loading, setLoading] = useState(false);
  const request = useHttps();
  const { appsData, refetch } = useGetAllAppsSingleJob(jobId, true);
  const { patchJob } = usePatchSingleJob();

  const updateAppStatus = async (
    appId: string,
    data: Partial<jobAppDataType>
  ) => {
    setLoading(true);
    if (!jobId || !appId) return;

    // Ensure appsData is fetched and not empty
    if (!appsData || appsData.length === 0) {
      setLoading(false);
      toast.error("Applicants data could not be loaded. Please try again.");
      return;
    }

    // Check if any applications have the status "ACCEPTED"
    const isAlreadyAccepted = appsData.some((app) => app.status === "ACCEPTED");

    if (isAlreadyAccepted && data.status === "ACCEPTED") {
      toast.error("A candidate has already been accepted for this job.");
      return;
    }

    try {
      const url: HttpConfig = {
        url: `jobs-service/applications/${appId}/status`,
        method: "patch",
        data, // Pass the data payload for the patch request
        headers: {
          "Content-Type": "application/json", // Default headers
        },
      };

      const onSuccess = ({ data }: SuccessHttpResponse<jobAppDataType>) => {
        toast.success("App status updated!");
        setLoading(false);
        // Call patchJob if there is an accepted applicant
        if (data.status === "ACCEPTED") {
          patchJob(jobId, { isPublished: false }, true);
        }

        // Refetch the applicant data to get the latest status
        refetch();
        return data;
      };

      const onError = (err: AxiosError<ErrorHttpResponse>) => {
        console.log("onPatchError");
        toast.error(
          err?.response?.data?.message ?? "Failed to update app status"
        );
        setLoading(false);
      };

      return request(url, onSuccess, setLoading, onError);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    updateAppStatus,
  };
};

export default usePatchAppStatus;
