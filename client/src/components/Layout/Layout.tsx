import React from "react";
import "./Layout.less";

export interface ILayoutProps {
  header: React.ReactNode;
  contentDirection?: "row" | "column";
}

export const Layout: React.FunctionComponent<ILayoutProps> = ({
  header,
  children,
  contentDirection = "row",
}) => {
  return (
    <div className="layout">
      <header className="layout-header">{header}</header>
      <main data-direction={contentDirection} className="layout-content">
        {children}
      </main>
    </div>
  );
};
