import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { ToastWrapper } from './components/ToastWrapper/ToastWrapper';
import { interceptors } from './interceptors';
import store from './redux/store';
import { router } from './routes/routes';

interceptors.errorInterceptor();

function App() {
  return (
    <>
      <Provider store={store}>
        <ToastWrapper>
          <Toaster position='top-center' reverseOrder={false} />
        </ToastWrapper>

        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
