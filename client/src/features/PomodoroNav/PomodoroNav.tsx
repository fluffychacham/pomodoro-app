import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IPomodoroNav,
  EPomodoroNav,
  setNav,
} from "../../stores/PomodoroNavSlice";
import { RootState } from "../../stores/store";

import style from "./PomodoroNav.module.scss";

// Set nav strings here.
const POMODORO_TEXT = "Pomodoro";
const SHORT_BREAK_TEXT = "Short Break";
const LONG_BREAK_TEXT = "Long Break";

/**
 * Pomodoro nav react component.
 *
 * @return Tsx
 */
export const PomodoroNav: FunctionComponent = () => {
  // TODO Might move this components redux store in the same folder
  const dispatch = useDispatch();
  const navSelector = useSelector(
    (state: RootState) => (state.pomodoroNav || ({} as IPomodoroNav)).nav
  );

  return <div className={style.container}>pomodoro nav</div>;
};
