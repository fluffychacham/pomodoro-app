import { RouteObject } from 'react-router-dom';

import { lazyImport } from '@/utils';

const { AuthRoutes } = lazyImport(() => import("@/features"), "AuthRoutes");

export const PublicRoutes: RouteObject[] = [
  {
    path: "/*",
    element: <AuthRoutes />,
  },
];
