import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { authActions } from '../../redux/slices/authSlice';
import { useAppDisPatch } from '../../redux/store';
import { ACCOUNT, SIGNIN } from '../../routes/routeConstants';

const useOnLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDisPatch();

  const logoutUser = () => {
    const onSuccess = () => {
      toast.success('Signed Out');
      localStorage.removeItem('authData');
      dispatch(authActions.reset());
      navigate(`${ACCOUNT}/${SIGNIN}`);
    };

    onSuccess();
  };

  return {
    logoutUser,
  };
};

export default useOnLogout;
