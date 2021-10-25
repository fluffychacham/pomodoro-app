import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { IPomodoroNav, EPomodoroNav } from "../../stores/PomodoroNavSlice";
import { RootState } from "../../stores/store";
import { MainMenu } from "../MainMenu";

import style from "./PomodoroContent.module.scss";

/**
 * Pomodoro content react component.
 *
 * @return Tsx
 */
export const PomodoroContent: FunctionComponent = () => {
  const selector = useSelector(
    (state: RootState) => (state.pomodoroNav || ({} as IPomodoroNav))?.nav
  );
  const displayCurrentNav = (currentNav: EPomodoroNav): string => {
    switch (currentNav) {
      case EPomodoroNav.SHORT_BREAK:
        return "Short break";
      case EPomodoroNav.LONG_BREAK:
        return "Long break";
      default:
        return "Pomodoro";
    }
  };

  return (
    <div className={style.container}>
      <MainMenu />
      {displayCurrentNav(selector)}
    </div>
  );
};
