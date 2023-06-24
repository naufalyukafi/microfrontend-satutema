import { BsChatLeftDots, BsShop } from 'react-icons/bs';
import { FiHome, FiSettings } from 'react-icons/fi';
import { TfiGallery } from 'react-icons/tfi';
import { DashboardSidebarNavItem } from '../../../../ts/DashboardSidebar';

function generateSidebarItemsTema(): DashboardSidebarNavItem[] {
  return [
    {
      name: 'Beranda',
      path: '/',
      icon: FiHome,
    },
    {
      name: 'Tentang',
      path: '/',
      icon: FiSettings,
    },
    {
      name: 'Menu',
      path: '/',
      icon: BsShop,
    },
    {
      name: 'Galeri',
      path: '/',
      icon: TfiGallery,
    },
    {
      name: 'Testimoni',
      path: '/',
      icon: BsChatLeftDots,
    },
  ];
}

export default generateSidebarItemsTema;
