import axios from 'axios';

import store from '../redux/store';

const authInterceptor = () =>
  axios.interceptors.request.use(
    (request) => {
      const fromStore = store.getState().auth.authData;
      if (fromStore?.authCredentials.accessToken && request.headers) {
        request.headers.Authorization = `Bearer ${fromStore?.authCredentials.accessToken}`;
      }

      return request;
    },
    (error) => Promise.reject(error)
  );

export default authInterceptor;
