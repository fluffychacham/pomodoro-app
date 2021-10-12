import { FunctionComponent } from "react";
import { Logo } from "../../components/Logo";
import { MenuButton } from "../MenuButton";
import { PomodoroNav } from "../PomodoroNav";
import { PomodoroSettingsButton } from "../PomodoroSettingsButton";
import { PomodoroTaskListButton } from "../PomodoroTaskListButton";
import { TimeDisplay } from "../TimeDisplay";

import style from "./PomodoroHeader.module.scss";

/**
 * Pomodoro header react component.
 *
 * @return Tsx
 */
export const PomodoroHeader: FunctionComponent = () => {
  return (
    <div className={style.container}>
      <div className={style.leftGroup}>
        <MenuButton />
        <TimeDisplay />
      </div>
      <div className={style.center}>
        <Logo />
        <PomodoroNav />
      </div>
      <div className={style.rightGroup}>
        <PomodoroSettingsButton />
        <PomodoroTaskListButton />
      </div>
    </div>
  );
};
