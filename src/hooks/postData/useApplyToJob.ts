import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useGetUserId from "../id/useGetUserId";
import useHttps from "../useHttps";
import {
  SuccessHttpResponse,
  ErrorHttpResponse,
  HttpConfig,
} from "../../models/https";
import { jobAppDataType } from "../../models/jobApp/jobApp.model";

const useApplyToJob = () => {
  const { userId } = useGetUserId(); // Fetch userId from custom hook
  const [loading, setLoading] = useState(false);
  const request = useHttps();

  const applyToJob = async (
    jobId: string,
    data: FormData,
    jobCreatorId?: string // Optional parameter for job creator ID
  ) => {
    if (!userId) {
      toast.error("User ID is not available.");
      return;
    }

    // Check if the user applying is the same as the job creator
    if (userId === jobCreatorId) {
      toast.error("You cannot apply to a job you created.");
      return;
    }

    const url: HttpConfig = {
      url: `jobs-service/applications/${jobId}/apply`,
      method: "post",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data", // Important for FormData
      },
    };

    try {
      setLoading(true);

      const onSuccess = ({ data }: SuccessHttpResponse<jobAppDataType>) => {
        toast.success("Job application submitted successfully!");
      };

      const onError = (err: AxiosError<ErrorHttpResponse>) => {
        toast.error(err?.response?.data?.message ?? "Failed to apply for job");
      };

      await request(url, onSuccess, setLoading, onError);
    } catch (error) {
      console.error("Failed to apply for job", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    applyToJob,
  };
};

export default useApplyToJob;
