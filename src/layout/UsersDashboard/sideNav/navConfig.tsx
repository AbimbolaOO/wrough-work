import FourCubes from '../../../components/Icons/FourCubes';
import JobsIcon from '../../../components/Icons/JobsIcon';
import PlaneIcon from '../../../components/Icons/PlaneIcon';
import SettingsIcon from '../../../components/Icons/SettingsIcon';
import {
  APPLICATION,
  DASHBOARD,
  LOCUMJOBS,
  USERS_SETTINGS,
} from '../../../routes/routeConstants';

interface INavConfig {
  title: string;
  path: string;
  icon: React.ReactNode;
}

export const navConfig: INavConfig[] = [
  {
    title: 'Dashboard',
    path: DASHBOARD,
    icon: <FourCubes />,
  },
  {
    title: 'Locum Jobs',
    path: LOCUMJOBS,
    icon: <JobsIcon />,
  },
  {
    title: 'Applications',
    path: APPLICATION,
    icon: <PlaneIcon />,
  },
  {
    title: 'Settings',
    path: USERS_SETTINGS,
    icon: <SettingsIcon />,
  },
];
