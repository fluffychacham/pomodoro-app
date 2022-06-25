import { useUser, useUserPreferences } from "@/features/user";
import * as antd from "antd";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import React, { useEffect, useState } from "react";
import "./AppLoader.less";

const AppLoading: React.FunctionComponent = () => {
  return (
    <div className="app-loader-loading">
      <antd.Spin />
      <span>Loading...</span>
    </div>
  );
};

export const AppLoader: React.FunctionComponent = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { init: userInit } = useUser();
  const { init: preferencesInit } = useUserPreferences();

  useEffect(() => {
    (async () => {
      const user = await userInit();
      if (!!user) {
        await preferencesInit(user);
      }

      setIsLoading(false);
    })();
  }, [userInit, preferencesInit]);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <React.Suspense fallback={<AppLoading />}>
      <ErrorBoundary message="Error" description="Something went wrong. Please try again later.">
        {children}
      </ErrorBoundary>
    </React.Suspense>
  );
};
