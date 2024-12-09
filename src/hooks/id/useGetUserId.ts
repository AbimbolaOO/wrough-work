import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const useGetUserId = () => {
  const authData = useSelector((state: RootState) => state.auth.authData);

  const userId = authData?.id;
  return {
    userId,
  };
};

export default useGetUserId;
