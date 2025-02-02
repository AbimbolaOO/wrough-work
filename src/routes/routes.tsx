import { createBrowserRouter, Navigate } from 'react-router';

import { ErrorBoundary } from '../components/ErrorBoundary';
// import ErrorBoundary from '../components/ErrorBoundary';
import AuthLayout from '../layout/Auth/AuthLayout';
import DashboardLayout from '../layout/UsersDashboard/DashboardLayout';
import EnterNewPassword from '../pages/Auth/ForgotPassword/EnterNewPassWord';
import ForgotPassword from '../pages/Auth/ForgotPassword/ForgotPassword';
import ForgotPasswordSuccess from '../pages/Auth/ForgotPassword/ForgotPasswordSuccess';
import SignIn from '../pages/Auth/SignIn/SignIn';
import SignUp from '../pages/Auth/SignUp/SignUp';
import SignupOtp from '../pages/Auth/SignupOtp/SignupOtp';
import Application from '../pages/Dashboard/Application/Application';
import Bookmarks from '../pages/Dashboard/Bookmarks/Bookmarks';
import DashboardHome from '../pages/Dashboard/Dashboard/DashboardHome';
import LocumJobs from '../pages/Dashboard/LocumJobs/LocumJobs';
import ManagePostedJobs from '../pages/Dashboard/ManagePostedJobs/ManagePostedJobs';
import ManagePostJobApplicant from '../pages/Dashboard/ManagePostJobApplicant/ManagePostJobApplicant';
import Notifications from '../pages/Dashboard/Notifications/Notifications';
import Settings from '../pages/Dashboard/Settings/Settings';
import { NotFound404 } from '../pages/NotFound404';
import {
  ACCOUNT,
  APPLICATION,
  BOOKMARKS,
  DASHBOARD,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  LOCUMJOBS,
  MANAGE_POSTED_JOBS,
  NOTFOUND,
  NOTIFICATIONS,
  PASSWORD_RESET,
  SIGNIN,
  SIGNUP,
  SIGNUP_OTP,
  USERS_SETTINGS,
} from './routeConstants';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: '/', element: <Navigate to={DASHBOARD} /> },
      { path: DASHBOARD, element: <DashboardHome /> },
      { path: LOCUMJOBS, element: <LocumJobs /> },
      { path: APPLICATION, element: <Application /> },
      { path: USERS_SETTINGS, element: <Settings /> },
      { path: NOTIFICATIONS, element: <Notifications /> },
      { path: BOOKMARKS, element: <Bookmarks /> },
      {
        path: `${DASHBOARD}/${MANAGE_POSTED_JOBS}`,
        element: <ManagePostedJobs />,
      },
      {
        path: `${DASHBOARD}/${MANAGE_POSTED_JOBS}/:jobId`,
        element: <ManagePostJobApplicant />,
      },

      { path: NOTFOUND, element: <NotFound404 /> },
      { path: '*', element: <Navigate to={`/${NOTFOUND}`} replace /> },
    ],
  },

  {
    path: ACCOUNT,
    element: <AuthLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: SIGNIN, element: <SignIn /> },
      { path: SIGNUP, element: <SignUp /> },
      { path: SIGNUP_OTP, element: <SignupOtp /> },

      { path: FORGOT_PASSWORD, element: <ForgotPassword /> },
      { path: FORGOT_PASSWORD_SUCCESS, element: <ForgotPasswordSuccess /> },
      { path: PASSWORD_RESET, element: <EnterNewPassword /> },

      { path: NOTFOUND, element: <NotFound404 /> },
      { path: '*', element: <Navigate to={`/${NOTFOUND}`} replace /> },
    ],
  },
  {
    path: '*',
    errorElement: <ErrorBoundary />,
    element: <NotFound404 />,
  },
]);
