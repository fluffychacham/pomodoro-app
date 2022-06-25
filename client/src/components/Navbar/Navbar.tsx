import React from "react";
import { MenuButton } from "..";
import { Time } from "../Time";
import "./Navbar.less";

export interface INavbarProps {
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

export const Navbar: React.FunctionComponent<INavbarProps> = ({ centerContent, rightContent }) => {
  return (
    <nav className="navbar">
      <div className="left-content">
        <MenuButton />
        <Time />
      </div>
      {!!centerContent && <div className="center-content">{centerContent}</div>}
      {!!rightContent && <div className="right-content">{rightContent}</div>}
    </nav>
  );
};
