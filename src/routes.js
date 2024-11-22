import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import EmailDashboard from 'views/admin/Email';
import RTL from 'views/admin/rtl';
import PoliciesTable from 'views/admin/policies/PoliciesList';

// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/dashboard',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
    isSideBarList: true
  },
  {
    name: 'User Dashboard',
    layout: '/user',
    path: '/dashboard',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
    isSideBarList: false
  },
  {
    name: 'NFT Marketplace',
    layout: '/admin',
    path: '/nft-marketplace',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <NFTMarketplace />,
    secondary: true,
    isSideBarList: false
  },
  {
    name: 'Emails',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
    component: <EmailDashboard />,
    isSideBarList: true
  },
  {
    name: 'Users',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/users',
    component: <DataTables />,
    isSideBarList: true
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
    isSideBarList: false
  },
  {
    name: 'Policies',
    layout: '/admin',
    path: '/policies',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <PoliciesTable />,
    isSideBarList: true
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
  // {
  //   name: 'RTL Admin',
  //   layout: '/rtl',
  //   path: '/rtl-default',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: <RTL />,
  // },
];

export default routes;
