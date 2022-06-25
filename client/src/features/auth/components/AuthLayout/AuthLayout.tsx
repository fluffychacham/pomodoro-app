import React from "react";
import "./AuthLayout.less";
import * as antd from "antd";

export interface IAuthLayoutProps {
  title: React.ReactNode;
}

export const AuthLayout: React.FunctionComponent<IAuthLayoutProps> = ({ title, children }) => {
  return (
    <antd.Card className="auth-layout" title={title}>
      {children}
    </antd.Card>
  );
};
