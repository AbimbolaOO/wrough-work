import FourCubes from '../../../components/Icons/FourCubes';
import JobsIcon from '../../../components/Icons/JobsIcon';
import PlaneIcon from '../../../components/Icons/PlaneIcon';
import SettingsIcon from '../../../components/Icons/SettingsIcon';
import {
  APPLICATION,
  DASHBOARD,
  LOCUMJOBS,
  UERS_SETTINGS,
} from '../../../routes/routeConstants';

interface INavConfig {
  title: string;
  path: string;
  icon: (isVisible: boolean) => JSX.Element;
}

export const navConfig: INavConfig[] = [
  {
    title: 'Dashboard',
    path: DASHBOARD,
    icon: (isVisible) => <FourCubes isVisible={isVisible} />,
  },
  {
    title: 'Locum Jobs',
    path: LOCUMJOBS,
    icon: (isVisible) => <JobsIcon isVisible={isVisible} />,
  },
  {
    title: 'Applications',
    path: APPLICATION,
    icon: (isVisible) => <PlaneIcon isVisible={isVisible} />,
  },
  {
    title: 'Settings',
    path: UERS_SETTINGS,
    icon: (isVisible) => <SettingsIcon isVisible={isVisible} />,
  },
];
