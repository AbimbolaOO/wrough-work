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
import { BasicInfoDataType } from "../../models/settings/profileSettings/basicInformation.model";

const usePutUserData = () => {
  const { userId } = useGetUserId();
  const [userData, setUserData] = useState<BasicInfoDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const request = useHttps();

  const putUserData = async (data: BasicInfoDataType) => {
    if (!userId) return;

    const url: HttpConfig = {
      url: `auth-service/users/${userId}`,
      method: "put",
      data, // send the updated data
    };

    try {
      setLoading(true); // Set loading to true before making the request

      const onSuccess = ({ data }: SuccessHttpResponse<BasicInfoDataType>) => {
        setUserData(data);
        toast.success("User data updated successfully!");
      };

      const onError = (err: AxiosError<ErrorHttpResponse>) => {
        console.log("onPutUserError");
        toast.error(err?.response?.data?.message ?? "Failed to edit user data");
        throw err; // Ensure the error is propagated
      };

      await request(url, onSuccess, setLoading, onError); // Await the request
    } catch (error) {
      console.error("Failed to update user data", error);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return {
    loading,
    userData,
    putUserData, // Return the function to call it from outside the hook
  };
};

export default usePutUserData;
