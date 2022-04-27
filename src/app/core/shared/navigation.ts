

import icHome from '@iconify/icons-ic/twotone-home';
import icBusiness from '@iconify/icons-ic/twotone-business';
import icPlay from '@iconify/icons-ic/twotone-play-circle';
import icSports from '@iconify/icons-ic/twotone-sports';
import icMonitorHeart from '@iconify/icons-ic/twotone-monitor-heart';
import icComputer from '@iconify/icons-ic/twotone-computer';
import icScience from '@iconify/icons-ic/twotone-science';
import icLightBulb from '@iconify/icons-ic/twotone-lightbulb';
import icSearch from '@iconify/icons-ic/twotone-search';
import icBookmark from '@iconify/icons-ic/twotone-bookmarks';
import { NavigationItem } from '../interfaces/navigation-item.interface';


export const NavigationList: NavigationItem[] = [
  {
    type: 'link',
    label: 'Top Stories',
    route: '/news/top-stories',
    icon: icHome,
    routerLinkActiveOptions: { exact: true }
  },
  {
    type: 'link',
    label: 'News Search',
    route: '/news/search',
    icon: icSearch,
    routerLinkActiveOptions: { exact: true }
  },
  {
    type: 'subheading',
    label: 'Categories',
    children: [
      {
        type: 'link',
        label: 'Business',
        route: '/news/category/business',
        icon: icBusiness,
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'link',
        label: 'Health',
        route: '/news/category/health',
        icon: icMonitorHeart,
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'link',
        label: 'Sports',
        route: '/news/category/sports',
        icon: icSports,
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'link',
        label: 'Entertainment',
        route: '/news/category/entertainment',
        icon: icPlay,
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'link',
        label: 'Science',
        route: '/news/category/science',
        icon: icScience,
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'link',
        label: 'Technology',
        route: '/news/category/technology',
        icon: icComputer,
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'link',
        label: 'General',
        route: '/news/category/general',
        icon: icLightBulb
      },

    ]
  },
  {
    type: 'subheading',
    label: 'Personal',
    children: [
      {
        type: 'link',
        label: 'Bookmarks',
        route: '/news/bookmarks',
        icon: icBookmark,
        routerLinkActiveOptions: { exact: true }
      }
    ]
  }
];
