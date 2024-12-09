import React from "react";
import { Toaster } from "react-hot-toast";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { ToastWrapper } from "./components/ToastWrapper/ToastWrapper";
import { interceptors } from "./interceptors";
import Router from "./routes/routes";
import store from "./redux/store";
import { Provider } from "react-redux";

interceptors.errorInterceptor();

function App() {
  return (
    <>
      <Provider store={store}>
        <ScrollToTop />
        <ToastWrapper>
          <Toaster position="top-center" reverseOrder={false} />
        </ToastWrapper>
        <Router />
      </Provider>
    </>
  );
}

export default App;
