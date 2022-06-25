import React from 'react';
import { useRoutes } from 'react-router-dom';

import { useAuthStore } from '@/stores';

import { PrivateRoutes, PublicRoutes } from './';

export const AppRoutes: React.FunctionComponent = () => {
  const auth = useAuthStore();

  const routes = !!auth.isAuthenticated ? PrivateRoutes : PublicRoutes;

  const element = useRoutes([...routes]);

  return element;
};
