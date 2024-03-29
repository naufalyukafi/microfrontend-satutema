import Home from './pages/Home';
import ProtectedRoute from './utils/ProtectedRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CreateWebsite from './pages/CreateWebsite';
import AdminDashboard from './pages/admin';
import NotFound from './pages/404';
import Categories from './pages/admin/categories';
import Theme from './pages/admin/theme';
import ThemeEditor from './pages/admin/theme/ThemeEditor';
import UserDashboard from './pages/user';
import SettingDashboard from './pages/user/setting';
import FeatureDashboard from './pages/user/feature';
import TestimonyDashboard from './pages/user/testimony';
import GalleryDashboard from './pages/user/gallery';
import ProductDashboard from './pages/user/product';
import ChoseTheme from './pages/user/chosetheme';
import Website from './pages/admin/website';
import WebsiteEditor from './pages/admin/website/WebsiteEditor';
// import Website from './pages/user/website';
// import WebsitePreview from './pages/user/websitepreview';

const AdminRoute = [
  {
    path: 'admin',
    component: <AdminDashboard />,
  },
  {
    path: 'admin/categories',
    component: <Categories />,
  },
  {
    path: 'admin/website',
    component: <Website />,
  },
  {
    path: 'admin/website-editor/:id',
    component: <WebsiteEditor />,
  },
  {
    path: 'admin/theme',
    component: <Theme />,
  },
  {
    path: 'admin/theme-editor/:id',
    component: <ThemeEditor />,
  },
];

const UserRoute = [
  // {
  //   path: '/:id',
  //   component: <Website />,
  // },
  // {
  //   path: 'preview/:id',
  //   component: <WebsitePreview />,
  // },
  {
    path: 'user',
    component: <UserDashboard />,
  },
  {
    path: 'user/setting',
    component: <SettingDashboard />,
  },
  {
    path: 'user/feature',
    component: <FeatureDashboard />,
  },
  {
    path: 'user/testimony',
    component: <TestimonyDashboard />,
  },
  {
    path: 'user/gallery',
    component: <GalleryDashboard />,
  },
  {
    path: 'user/product',
    component: <ProductDashboard />,
  },
  {
    path: 'user/theme',
    component: <ChoseTheme />,
  },
];

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/register/create" element={<CreateWebsite />} />

        {AdminRoute.map((el, i) => (
          <Route
            key={i}
            path={el.path}
            element={
              <ProtectedRoute isAllowed={'admin'}>
                {el.component}
              </ProtectedRoute>
            }
          />
        ))}

        {UserRoute.map((el, i) => (
          <Route
            key={i}
            path={el.path}
            element={
              <ProtectedRoute isAllowed={'user'}>{el.component}</ProtectedRoute>
            }
          />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
