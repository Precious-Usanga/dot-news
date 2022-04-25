

import icDashboard from '@iconify/icons-ic/twotone-dashboard';
import { NavigationItem } from '../interfaces/navigation-item.interface';


export const NavigationList: NavigationItem[] = [
  {
    type: 'link',
    label: 'Top Stories',
    route: '/',
    icon: icDashboard,
  },
  {
    type: 'link',
    label: 'Around The World',
    route: '/a',
    icon: icDashboard,
  },
  {
    type: 'link',
    label: 'Business',
    route: '/b',
    icon: icDashboard,
  },
  {
    type: 'link',
    label: 'Health',
    route: '/c',
    icon: icDashboard,
  }
];
