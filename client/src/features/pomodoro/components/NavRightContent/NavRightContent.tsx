import React from "react";
import { PomodoroTaskListButton } from "..";
import "./NavRightContent.less";

export const NavRightContent: React.FunctionComponent = () => {
  return (
    <div className="pomodoro-nav-right-content">
      <PomodoroTaskListButton />
    </div>
  );
};
