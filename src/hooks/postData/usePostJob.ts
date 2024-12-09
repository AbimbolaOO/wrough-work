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
import { JobPostingDataType } from "../../models/jobPosting/jobPosting.model";
import { expired } from "../../utils/utils";

const usePostJob = () => {
  const { userId } = useGetUserId();
  const [jobData, setJobData] = useState<JobPostingDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const request = useHttps();

  const postJob = async (data: JobPostingDataType) => {
    if (!userId) return;

    // Check if the expiry date has passed
    if (expired(data.expiryDate)) {
      const errorMessage =
        "Already Expired, Can't create this job";
      toast.error(errorMessage);
      setLoading(false)
      throw new Error(errorMessage); // Prevent the job from being posted
    }

    const url: HttpConfig = {
      url: `jobs-service/jobs`,
      method: "post",
      data,
    };

    try {
      setLoading(true);

      const onSuccess = ({ data }: SuccessHttpResponse<JobPostingDataType>) => {
        setJobData(data);
        toast.success("Job uploaded successfully!");
        setLoading(false);
        return data; // return the newly created job data
      };

      const onError = (err: AxiosError<ErrorHttpResponse>) => {
        console.log("onPostJobError");
        toast.error(err?.response?.data?.message ?? "Failed to post job data");
        setLoading(false);
        throw err; // propagate the error
      };

      return await request(url, onSuccess, setLoading, onError);
    } catch (error) {
      setLoading(false);
      throw error; // Ensure that any error gets propagated to be handled elsewhere
    }
  };

  return {
    loading,
    jobData,
    postJob, // return the function to call it from outside the hook
  };
};

export default usePostJob;
