import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useHttps from "../useHttps";
import {
  SuccessHttpResponse,
  ErrorHttpResponse,
  HttpConfig,
} from "../../models/https";
import { JobPostingDataType } from "../../models/jobPosting/jobPosting.model";
import { expired } from "../../utils/utils";

const usePatchSingleJob = () => {
  const [loading, setLoading] = useState(false);
  const request = useHttps();

  const patchJob = async (
    jobId: string,
    data: Partial<JobPostingDataType>,
    silent?: boolean
  ) => {
    setLoading(true);

    // Check if the expiry date has passed
    if (data.expiryDate && expired(data.expiryDate)) {
      const errorMessage = "Already Expired, Can't update this job";
      toast.error(errorMessage);
      setLoading(false);
      throw new Error(errorMessage); // Prevent the job from being posted
    }

    try {
      const url: HttpConfig = {
        url: `jobs-service/jobs/${jobId}`,
        method: "patch",
        data,
      };

      const onSuccess = ({ data }: SuccessHttpResponse<JobPostingDataType>) => {
        !silent && toast.success("Job updated successfully!");
        setLoading(false);
        return data;
      };

      const onError = (err: AxiosError<ErrorHttpResponse>) => {
        console.log("onPatchJobError");
        toast.error(
          err?.response?.data?.message ?? "Failed to update job data"
        );
        setLoading(false);
        throw err;
      };

      return request(url, onSuccess, setLoading, onError);
    } catch (error) {
      setLoading(false);
      throw error; // Ensure that any error gets propagated to be handled elsewhere
    }
  };

  return {
    loading,
    patchJob, // Return the patchJob function to be used elsewhere
  };
};

export default usePatchSingleJob;
