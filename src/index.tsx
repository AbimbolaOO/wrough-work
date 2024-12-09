import './utils/prototypes';

import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Global, ThemeProvider } from '@emotion/react';

import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import GlobalStyles, { theme } from './globalStyles';
import { interceptors } from './interceptors';
import store from './redux/store';

interceptors.authInterceptor();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HelmetProvider>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Global styles={GlobalStyles} />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </HelmetProvider>
);
