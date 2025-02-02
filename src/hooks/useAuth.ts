import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

import { IPasswordReset } from '../models/auth/resetPassword.model';
import { ILocumUserData, LocumSignInDataType } from '../models/auth/signIn.model';
import { ISignupData } from '../models/auth/signUp.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../models/https';
import { authActions } from '../redux/slices/authSlice';
import { useAppDisPatch } from '../redux/store';
import { ACCOUNT, PASSWORD_RESET, USERS_DASHBOARD } from '../routes/routeConstants';
import useHttps from './useHttps';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const request = useHttps();
  const dispatch = useAppDisPatch();

  const onLoginError = (err: AxiosError<ErrorHttpResponse>) => {
    console.log("onLoginError");
    toast.error(err?.response?.data?.message ?? "Something went wrong");
  };

  const setAuthentication = ({ data }: SuccessHttpResponse<ILocumUserData>) => {
    dispatch(
      authActions.setAuthentication({ authData: data, isAuthenticated: true })
    );
    localStorage.setItem("authData", JSON.stringify(data));
    navigate(USERS_DASHBOARD, { replace: true });
  };

  const loginUser = (data: LocumSignInDataType) => {
    const url: HttpConfig = {
      url: "auth-service/users/signin",
      method: "post",
      data,
    };

    request(url, setAuthentication, setLoading, onLoginError);
  };

  const signupEmailPassword = ({ data }: SuccessHttpResponse<any>) => {
    navigate(`/${ACCOUNT}/${PASSWORD_RESET}`, {
      replace: true,
      state: { data: data },
    });
  };

  const signupUser = (data: ISignupData) => {
    const url: HttpConfig = {
      url: "auth-service/users/signup",
      method: "put",
      data,
    };

    request(url, signupEmailPassword, setLoading, onLoginError);
  };

  const logoutUser = () => {
    const onSuccess = () => {
      toast.success("Signed Out");
      localStorage.removeItem("authData");
      dispatch(authActions.reset());
      navigate("account/signin");
    };

    onSuccess();
  };

  const onRefreshScreen = () => {
    const data = localStorage.getItem("authData");

    if (data) {
      const authData = JSON.parse(data);
      if (!authData.user.verified) {
        // TODO:: fix this
        navigate(`link-to-verify-account`, { replace: true });
      }
      dispatch(
        authActions.setAuthentication({ authData, isAuthenticated: true })
      );
    } else {
      navigate("/account/signin", { replace: true });
    }
  };

  const onPasswordReset = ({ data }: SuccessHttpResponse<ILocumUserData>) => {
    navigate(`/${ACCOUNT}/${PASSWORD_RESET}`);
  };

  const passwordReset = (data: IPasswordReset) => {
    const url: HttpConfig = {
      url: `auth-service/users/reset-password`,
      method: "post",
      data,
    };

    request(url, onPasswordReset, setLoading, onLoginError);
  };

  return {
    loading,
    loginUser,
    signupUser,
    logoutUser,
    onRefreshScreen,
    passwordReset,
  };
};

export default useAuth;
