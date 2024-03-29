import { BiCategory, BiHome } from 'react-icons/bi';
import { FaChrome, FaLaptopCode } from 'react-icons/fa';

import { DashboardSidebarNavItem } from '../../../../ts/DashboardSidebar';

function generateSidebarItemsAdmin(): DashboardSidebarNavItem[] {
  return [
    { name: 'Dashboard', path: '/admin', icon: BiHome },
    {
      name: 'Kategori',
      path: '/admin/categories',
      icon: BiCategory,
    },
    {
      name: 'Website',
      path: '/admin/website',
      icon: FaChrome,
    },
    {
      name: 'Tema',
      path: '/admin/theme',
      icon: FaLaptopCode,
    },
    // {
    //    name: 'Pengaturan',
    //    path: '/',
    //    icon: FiSettings,
    //    sub: [
    //       {
    //          name: 'Pengaturan Sistem',
    //          path: '/admin/system-settings',
    //       },
    //       {
    //          name: 'Pengaturan Website',
    //          path: '/admin/frontend-settings',
    //       },
    //    ],
    // },
  ];
}

export default generateSidebarItemsAdmin;
