import React from 'react';
import { RouteObject } from 'react-router-dom';

import { MenuDrawer } from '@/components';
import { TASK_LIST_BASE_PATH } from '@/features/tasklist';
import { lazyImport } from '@/utils';

const { PomodoroRoutes } = lazyImport(() => import("@/features/pomodoro"), "PomodoroRoutes");
const { TaskListRoutes } = lazyImport(() => import("@/features/tasklist"), "TaskListRoutes");

const PrivateRoutesComponent: React.FunctionComponent<{ element: React.ReactNode }> = ({
  element,
}) => {
  return (
    <>
      <MenuDrawer />
      {element}
    </>
  );
};

export const PrivateRoutes: RouteObject[] = [
  {
    path: `${TASK_LIST_BASE_PATH}/*`,
    element: <PrivateRoutesComponent element={<TaskListRoutes />} />,
  },
  {
    path: "/*",
    element: <PrivateRoutesComponent element={<PomodoroRoutes />} />,
  },
];
