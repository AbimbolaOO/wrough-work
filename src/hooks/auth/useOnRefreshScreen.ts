import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ILocumUserData } from '../../models/auth/signIn.model';
import { authActions } from '../../redux/slices/authSlice';
import { useAppDisPatch } from '../../redux/store';
import { ACCOUNT, SIGNIN, SIGNUP_OTP } from '../../routes/routeConstants';

const useOnRefreshScreen = () => {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>();
  const navigate = useNavigate();
  const dispatch = useAppDisPatch();

  const onRefreshScreen = () => {
    const data = localStorage.getItem('authData');

    if (data) {
      const authData: ILocumUserData = JSON.parse(data);

      if (!authData.isVerified) {
        setLoading(false);
        navigate(`/${ACCOUNT}/${SIGNUP_OTP}`, {
          // replace: true,
          state: { data: authData.email },
        });
      }
      setLoading(false);
      dispatch(
        authActions.setAuthentication({ authData, isAuthenticated: true })
      );
      setUserId(authData?.id);
    } else {
      setLoading(false);
      navigate(`/${ACCOUNT}/${SIGNIN}`, { replace: true });
    }
  };

  return {
    onRefreshScreen,
    loading,
    userId
  };
};

export default useOnRefreshScreen;
