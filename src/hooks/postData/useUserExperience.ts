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
import { ExperienceDataType } from "../../models/settings/profileSettings/experience.model";

const useUserExperience = () => {
  const { userId } = useGetUserId();
  const [experience, setExperience] = useState<ExperienceDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const request = useHttps();

  const sendExperience = async (data: FormData) => {
    if (!userId) return;

    const url: HttpConfig = {
      url: `auth-service/users/${userId}/experiences`,
      method: "post",
      data,
      headers: {
        "Content-Type": "multipart/form-data", // Important for FormData
      },
    };

    try {
      setLoading(true);
      
      const onSuccess = ({ data }: SuccessHttpResponse<ExperienceDataType>) => {
        setExperience(data);
        toast.success("Experience uploaded successfully!");
      };

      const onError = (err: AxiosError<ErrorHttpResponse>) => {
        console.log("Error");
        toast.error(
          err?.response?.data?.message ?? "Failed to send experience details"
        );
      };

      await request(url, onSuccess, setLoading, onError); // Await request
    } catch (error) {
      console.error("Failed to upload experience", error);
    } finally {
      setLoading(false); // Ensure loading is stopped after request
    }
  };

  return {
    loading,
    experience,
    sendExperience, // Return the async function
  };
};

export default useUserExperience;
