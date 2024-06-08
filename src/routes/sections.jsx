// import { element } from 'prop-types';

import { Dashboard, Home } from '@mui/icons-material';
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import Profile from 'src/layouts/dashboard/common/profile';
import Settings from 'src/layouts/dashboard/common/settings';

// ----------------------------------------------------------------------

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const StockManagement = lazy(() => import('src/sections/stockManagement/stockManagement'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
<<<<<<< HEAD
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: '/settings', element: <Settings /> },
        { path: '/profile', element: <Profile /> },
=======
        { path: 'management', element: <Home/>},
        { path: 'customer', element: <ProductsPage /> },
        { path: 'stockaffairs', element: <BlogPage /> },
        { path:'users', element: <UserPage /> },
       
>>>>>>> dc012152aa9aeb4ca926898a339b6845ce616414
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path : 'stockManagement',
      element : <StockManagement />
    }
      

  ]);

  return routes;
}
