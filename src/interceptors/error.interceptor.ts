import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { authActions } from '../redux/slices/authSlice';
import store from '../redux/store';

const errorInterceptor = () =>
  axios.interceptors.response.use(
    (response) => response,
    async (err: AxiosError) => {
      if (
        err.response?.status === 401 &&
        !window.location.href.includes('account')
      ) {
        toast.error('Session has expired');
        store.dispatch(authActions.reset());
        localStorage.removeItem('authData');
        window.location.reload();
      }
      return Promise.reject(err);
    }
  );

export default errorInterceptor;
