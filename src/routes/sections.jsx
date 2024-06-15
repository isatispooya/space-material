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
export const CustomerPage = lazy(() => import('src/pages/customer'));
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

        { path: 'user', element: <UserPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: '/settings', element: <Settings /> },
        { path: '/profile', element: <Profile /> },
        { path: 'management', element: <Home/>},
        { path: 'customer', element: <CustomerPage /> },
        { path: 'stockaffairs', element: <BlogPage /> },
        { path:'users', element: <UserPage /> },
       
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
