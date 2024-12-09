import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useGetUserId from "../id/useGetUserId";
import useHttps from "../useHttps";
import { useAppDisPatch } from "../../redux/store";
import { setVerificationId } from "../../redux/slices/verificationIdSlice";
import {
  SuccessHttpResponse,
  ErrorHttpResponse,
  HttpConfig,
} from "../../models/https";

const useUserVerification = () => {
  const { userId } = useGetUserId();
  const [verify, setVerify] = useState<null>(null);
  const [loading, setLoading] = useState(false);
  const request = useHttps();
  const dispatch = useAppDisPatch();

  const sendVerificationData = (data: FormData) => {
    if (!userId) return;

    const url: HttpConfig = {
      url: `auth-service/users/${userId}/verifications`,
      method: "post",
      data, 
      headers: {
        "Content-Type": "multipart/form-data",  // Important for FormData
      },
    };

    const onSuccess = ({ data }: SuccessHttpResponse<any>) => {
      setVerify(data);
      toast.success("Verification details sent successfully!");
         // Dispatch the verificationId to Redux
         if (data.id) {
          dispatch(setVerificationId(data.id));
        }
    };

    const onError = (err: AxiosError<ErrorHttpResponse>) => {
      console.log("verificationError");
      toast.error(
        err?.response?.data?.message ?? "Failed to send verification details"
      );
    };

    request(url, onSuccess, setLoading, onError);
  };

  return {
    loading,
    verify,
    sendVerificationData,
  };
};

export default useUserVerification;
