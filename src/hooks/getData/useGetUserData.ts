import { AxiosError } from "axios";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import useGetUserId from "../id/useGetUserId";
import useHttps from "../useHttps";
import {
  SuccessHttpResponse,
  ErrorHttpResponse,
  HttpConfig,
} from "../../models/https";
import { BasicInfoDataType } from "../../models/settings/profileSettings/basicInformation.model";

const useGetUserData = (optionalUserId?: string) => {
  const { userId } = useGetUserId(); // Get the default userId from another hook
  const [userData, setUserData] = useState<BasicInfoDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const request = useHttps();

  const idToUse = optionalUserId || userId; // Use the optionalUserId if passed, otherwise fall back to userId

  const fetchUserData = useCallback(() => {
    if (!idToUse) return; // Exit early if no ID is available

    const url: HttpConfig = {
      url: `auth-service/users/${idToUse}`,
      method: "get",
    };

    const onSuccess = ({ data }: SuccessHttpResponse<BasicInfoDataType>) => {
      setUserData(data); // Set the fetched user data
    };

    const onError = (err: AxiosError<ErrorHttpResponse>) => {
      console.log("onGetUserError");
      toast.error(err?.response?.data?.message ?? "Failed to load user data");
    };

    request(url, onSuccess, setLoading, onError);
  }, [idToUse, request]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return {
    loading,
    userData,
    refetch: fetchUserData, // Expose the refetch function
  };
};

export default useGetUserData;
