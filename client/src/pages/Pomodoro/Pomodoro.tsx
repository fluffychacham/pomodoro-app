import { FunctionComponent } from "react";
import { PomodoroContent } from "../../features/PomodoroContent";
import { PomodoroHeader } from "../../features/PomodoroHeader";
import style from "./Pomodoro.module.scss";

/**
 * Pomodoro react component.
 *
 * @return Tsx
 */
export const Pomodoro: FunctionComponent = () => {
  return (
    <div className={style.container}>
      <PomodoroHeader />
      <PomodoroContent />
    </div>
  );
};
