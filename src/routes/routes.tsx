import { Navigate, useRoutes } from 'react-router-dom';

import AuthLayout from '../layout/Auth/AuthLayout';
import UsersDashboardLayout from '../layout/UsersDashboard/UsersDashboardLayout';
import EnterNewPassword from '../pages/Auth/ForgotPassword/EnterNewPassWord';
import ForgotPassword from '../pages/Auth/ForgotPassword/ForgotPassword';
import ForgotPasswordSuccess from '../pages/Auth/ForgotPassword/ForgotPasswordSuccess';
import SignIn from '../pages/Auth/SignIn/SignIn';
import SignUp from '../pages/Auth/SignUp/SignUp';
import SignupOtp from '../pages/Auth/SignupOtp/SignupOtp';
import Application from '../pages/Dashboard/Application/Application';
import Bookmarks from '../pages/Dashboard/Bookmarks/Bookmarks';
import DashboardHome from '../pages/Dashboard/Dashboard/DashboardHome';
import ManagePostedJobs from '../pages/Dashboard/Dashboard/ManageJobs/ManagePostedJobs';
import ViewAllApps from '../pages/Dashboard/Dashboard/ViewAllApps/ViewAllApps';
import LocumJobs from '../pages/Dashboard/LocumJobs/LocumJobs';
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
  UERS_SETTINGS,
  VIEW_ALL_APPS,
} from './routeConstants';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <UsersDashboardLayout />,
      children: [
        { path: '/', element: <Navigate to={DASHBOARD} /> },
        { path: DASHBOARD, element: <DashboardHome /> },
        { path: LOCUMJOBS, element: <LocumJobs /> },
        { path: APPLICATION, element: <Application /> },
        { path: UERS_SETTINGS, element: <Settings /> },
        { path: NOTIFICATIONS, element: <Notifications /> },
        { path: BOOKMARKS, element: <Bookmarks /> },
        { path: MANAGE_POSTED_JOBS, element: <ManagePostedJobs /> },
        { path: `${VIEW_ALL_APPS}/:jobId`, element: <ViewAllApps /> },
        // { path: VIEW_ALL_POSTED_JOBS, element: <ViewAllPostedJobs /> },
        // { path: VIEW_ALL_APPLICANTS, element: <ViewAllApplicants /> },

        { path: NOTFOUND, element: <NotFound404 /> },
        { path: '*', element: <Navigate to={`/${NOTFOUND}`} replace /> },
      ],
    },

    {
      path: ACCOUNT,
      element: <AuthLayout />,
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
    { path: '*', element: <NotFound404 /> },
  ]);
}
