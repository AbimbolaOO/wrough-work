import { AxiosError } from "axios";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import useHttps from "../useHttps";
import { useAppSelector } from "../../redux/store";
import {
  SuccessHttpResponse,
  ErrorHttpResponse,
  HttpConfig,
} from "../../models/https";
import { VerificationDataType } from "../../models/settings/profileSettings/verification.model";

const useGetVerification = (optionalVerificationId?: string) => {
  const [verificationData, setVerificationData] =
    useState<VerificationDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const request = useHttps();
  const verificationId = useAppSelector(
    (state) => state.verification.verificationId
  );

  const idToUse = optionalVerificationId || verificationId; // Use optional ID if passed, otherwise use the one from state

  // Refetch function for reloading verification data
  const fetchVerificationData = useCallback(() => {
    if (!idToUse || idToUse === " ") return;

    setLoading(true); // Set loading to true before fetching
    const url: HttpConfig = {
      url: `auth-service/users/verifications/${idToUse}`,
      method: "get",
    };

    const onSuccess = ({ data }: SuccessHttpResponse<VerificationDataType>) => {
      setVerificationData(data); // Set fetched data
      setLoading(false); // Set loading to false after success
    };

    const onError = (err: AxiosError<ErrorHttpResponse>) => {
      if (err?.response?.status === 404) {
        setVerificationData(null); // No verification found, clear data
      } else {
        toast.error(
          err?.response?.data?.message ?? "Failed to get verification info"
        );
      }
      setLoading(false); // Ensure loading is turned off after error.
    };

    request(url, onSuccess, setLoading, onError);
  }, [idToUse, request]);

  // Fetch on component mount or when the id changes.
  useEffect(() => {
    const timer = setTimeout(fetchVerificationData, 1500); // Small delay to ensure ID is set
    return () => clearTimeout(timer); // Cleanup on unmount
  }, [fetchVerificationData]);

  console.log(`${idToUse} : ${verificationData?.primaryDegreeName}`);

  return {
    loading,
    verificationData,
    refetch: fetchVerificationData, // Expose refetch function
  };
};

export default useGetVerification;
