import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useHttps from "../useHttps";
import { ErrorHttpResponse, HttpConfig } from "../../models/https";

const useDeleteExperience = () => {
  const [loading, setLoading] = useState(false);
  const request = useHttps();

  const deleteExperience = async (experienceId: string) => {
    if (!experienceId) return;

    const url: HttpConfig = {
      url: `auth-service/users/experiences/${experienceId}`,
      method: "delete",
    };

    try {
      setLoading(true);

      await request(
        url,
        () => {
          toast.success("Experience section deleted successfully!");
        },
        setLoading,
        (err: AxiosError<ErrorHttpResponse>) => {
          toast.error(
            err?.response?.data?.message ?? "Failed to delete experience"
          );
          throw err;
        }
      );
    } catch (error) {
      console.error("Failed to delete experience", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    deleteExperience,
  };
};

export default useDeleteExperience;
