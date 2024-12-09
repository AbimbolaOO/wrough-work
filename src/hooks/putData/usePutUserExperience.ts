import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useHttps from "../useHttps";
import {
  SuccessHttpResponse,
  ErrorHttpResponse,
  HttpConfig,
} from "../../models/https";
import { ExperienceDataType } from "../../models/settings/profileSettings/experience.model";

const usePutUserExperience = () => {
  const [editXp, setEditXp] = useState<ExperienceDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const request = useHttps();

  const editExperience = async (experienceId: string, data: FormData) => {
    if (!experienceId) return;

    const url: HttpConfig = {
      url: `auth-service/users/experiences/${experienceId}`,
      method: "put",
      data,
      headers: {
        "Content-Type": "multipart/form-data", // Important for FormData
      },
    };

    try {
      setLoading(true);

      const onSuccess = ({ data }: SuccessHttpResponse<ExperienceDataType>) => {
        setEditXp(data);
        toast.success("Experience section edited successfully!");
      };

      const onError = (err: AxiosError<ErrorHttpResponse>) => {
        console.log("Error");
        toast.error(
          err?.response?.data?.message ?? "Failed to edit experience details"
        );
        throw err; // Ensure errors are propagated
      };

      await request(url, onSuccess, setLoading, onError); // Await the request
    } catch (error) {
      console.error("Failed to edit experience", error);
    } finally {
      setLoading(false); // Ensure loading state is updated
    }
  };

  return {
    loading,
    editXp,
    editExperience, // Async function that can be awaited
  };
};

export default usePutUserExperience;
