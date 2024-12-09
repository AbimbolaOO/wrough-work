import EditIcon from '../../../components/Icons/EditIcon';
import HeaderLogoutIcon from '../../../components/Icons/HeaderLogoutIcon';
import ProfileIcon from '../../../components/Icons/ProfileIcon';
import { APPLICATION, DASHBOARD, LOCUMJOBS } from '../../../routes/routeConstants';

interface IHeaderConfig {
  title: string;
  path: string;
  icon: any;
}

export const headerConfig: IHeaderConfig[] = [
  {
    title: 'View Profile',
    path: DASHBOARD,
    icon: <ProfileIcon />,
  },

  {
    title: 'Post Job',
    path: LOCUMJOBS,
    icon: <EditIcon />,
  },

  {
    title: 'Logout',
    path: APPLICATION,
    icon: <HeaderLogoutIcon />,
  },
];
