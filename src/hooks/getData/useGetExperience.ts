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
import { ExperienceDataType } from "../../models/settings/profileSettings/experience.model";

const useGetExperience = (optionalUserId?: string) => {
  const { userId } = useGetUserId();
  const [userExperience, setUserExperience] = useState<ExperienceDataType[]>(
    []
  ); // Expecting an array of ExperienceDataType
  const [loading, setLoading] = useState(false);
  const request = useHttps();

  const idToUse = optionalUserId || userId; // Use the optionalUserId if passed, otherwise fall back to userId

  // Extract the fetching logic into a separate function
  const fetchExperience = useCallback(() => {
    if (!idToUse) return; // Exit early if no ID is available

    const url: HttpConfig = {
      url: `auth-service/users/${idToUse}/experiences`,
      method: "get",
    };

    const onSuccess = ({ data }: SuccessHttpResponse<ExperienceDataType[]>) => {
      setUserExperience(data); // Data is an array of ExperienceDataType
    };

    const onError = (err: AxiosError<ErrorHttpResponse>) => {
      if (err?.response?.status === 404 || userExperience.length === 0) {
        setUserExperience([]);
      } else {
        toast.error(
          err?.response?.data?.message ?? "Failed to get User Experience"
        );
      }
    };

    request(url, onSuccess, setLoading, onError);
  }, [idToUse, request, userExperience.length]);

  // Fetch experience on component mount or when userId changes
  useEffect(() => {
    fetchExperience();
  }, [fetchExperience]);

  return {
    loading,
    userExperience,
    refetch: fetchExperience, // Expose the fetchExperience function as refetch
  };
};

export default useGetExperience;
