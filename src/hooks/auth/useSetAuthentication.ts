import { useNavigate } from 'react-router';

import { ILocumUserData } from '../../models/auth/signIn.model';
import { SuccessHttpResponse } from '../../models/https';
import { authActions } from '../../redux/slices/authSlice';
import { useAppDisPatch } from '../../redux/store';
import { DASHBOARD } from '../../routes/routeConstants';

const useSetAuthentication = () => {
  const navigate = useNavigate();
  const dispatch = useAppDisPatch();

  const setAuthentication = ({ data }: SuccessHttpResponse<ILocumUserData>) => {
    dispatch(
      authActions.setAuthentication({ authData: data, isAuthenticated: true })
    );
    localStorage.setItem('authData', JSON.stringify(data));
    navigate(`/${DASHBOARD}`, { replace: true });
  };

  return {
    setAuthentication,
  };
};

export default useSetAuthentication;
