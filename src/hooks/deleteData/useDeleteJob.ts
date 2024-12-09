import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useHttps from "../useHttps";
import {
  SuccessHttpResponse,
  ErrorHttpResponse,
  HttpConfig,
} from "../../models/https";
import useGetAllAppsSingleJob from "../getData/useGetAllAppsSingleJob";

const useDeleteJob = (jobId: string) => {
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const request = useHttps();
  const { appsData } = useGetAllAppsSingleJob(jobId, true);

  const deleteJob = async () => {
    // Remove the data parameter
    setLoading(true);
    if (
      appsData.length >= 1 &&
      appsData.every((app) => app.status !== "REJECTED")
    ) {
      setLoading(false);
      toast.error("Can not delete a job with Applicants");
      setDeleted(false);
      return;
    }
    try {
      const url: HttpConfig = {
        url: `jobs-service/jobs/${jobId}`,
        method: "delete", // No request body required for DELETE
      };

      const onSuccess = ({ data }: SuccessHttpResponse<null>) => {
        toast.success("Job deleted successfully!");
        setLoading(false);
        setDeleted(true);
        return data;
      };

      const onError = (err: AxiosError<ErrorHttpResponse>) => {
        console.log("onDeleteJobError");
        toast.error(err?.response?.data?.message ?? "Failed to delete job");
        setLoading(false);
        setDeleted(false);
        throw err;
      };

      return request(url, onSuccess, setLoading, onError);
    } catch (error) {
      setLoading(false);
      setDeleted(false);
      throw error; // Ensure that any error gets propagated to be handled elsewhere
    }
  };

  return {
    deleted,
    loading,
    deleteJob, // Return the deleteJob function to be used elsewhere
  };
};

export default useDeleteJob;
