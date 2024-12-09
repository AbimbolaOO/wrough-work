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
import { profilePicDataType } from "../../models/uploadprofilepic/uploadprofilepic.model";

const usePutUserProfilePic = () => {
  const { userId } = useGetUserId();
  const [profilePic, setProfilePic] = useState<profilePicDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const request = useHttps();

  const putProfilePic = (data: profilePicDataType) => {
    if (!userId) return;

    const formData = new FormData();

    // Assuming 'profileImage' is the key for the file in profilePicDataType here
    if (data.profileImage && data.profileImage instanceof Blob) {
      formData.append("profileImage", data.profileImage);
    }
    const url: HttpConfig = {
      url: `auth-service/users/${userId}`,
      method: "put",
      data: formData, // send the FormData object
      headers: {
        "Content-Type": "multipart/form-data", // Important for file uploads
      },
    };

    const onSuccess = ({ data }: SuccessHttpResponse<profilePicDataType>) => {
      setProfilePic(data);
      toast.success("User data updated successfully!");
    };

    const onError = (err: AxiosError<ErrorHttpResponse>) => {
      console.log("onPutUserError");
      toast.error(err?.response?.data?.message ?? "Failed to edit user data");
    };

    request(url, onSuccess, setLoading, onError);
  };

  return {
    loading,
    profilePic,
    putProfilePic, // return the function to call it from outside the hook
  };
};

export default usePutUserProfilePic;
