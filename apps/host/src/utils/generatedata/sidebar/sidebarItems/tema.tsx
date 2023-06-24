import { BsChatLeftDots, BsShop } from 'react-icons/bs';
import { FaLaptopCode } from 'react-icons/fa';
import { FiHome, FiSettings } from 'react-icons/fi';
import { TfiGallery } from 'react-icons/tfi';
import { MdFoodBank } from 'react-icons/md';
import { DashboardSidebarNavItem } from '../../../../ts/DashboardSidebar';

function generateSidebarItemsTema(): DashboardSidebarNavItem[] {
  return [
    {
      name: 'Beranda',
      path: '/#beranda',
      icon: FiHome,
    },
    {
      name: 'Tentang',
      path: '/#tentang',
      icon: FiSettings,
    },
    {
      name: 'Menu',
      path: '/#gallery',
      icon: BsShop,
    },
    {
      name: 'Galeri',
      path: '/#gallery',
      icon: TfiGallery,
    },
    {
      name: 'Testimoni',
      path: '/#testimony',
      icon: BsChatLeftDots,
    },
  ];
}

export default generateSidebarItemsTema;
