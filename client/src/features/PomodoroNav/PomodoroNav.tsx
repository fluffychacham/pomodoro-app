import { Button } from "antd";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EPomodoroNav, setNav } from "../../stores/PomodoroNavSlice";
import { RootState } from "../../stores/store";

import style from "./PomodoroNav.module.scss";

/**
 * Pomodoro nav react component.
 *
 * @return Tsx
 */
export const PomodoroNav: FunctionComponent = () => {
  // TODO Might move this components redux store in the same folder
  const dispatch = useDispatch();
  const navSelector = useSelector((state: RootState) => state.pomodoroNav.nav);

  return (
    <div className={style.container}>
      <Button
        type="primary"
        style={{ backgroundColor: "transparent" }}
        data-isactive={navSelector === EPomodoroNav.POMODORO}
        onClick={() => dispatch(setNav(EPomodoroNav.POMODORO))}
      >
        Pomodoro
      </Button>
      <Button
        type="primary"
        style={{ backgroundColor: "transparent" }}
        data-isactive={navSelector === EPomodoroNav.SHORT_BREAK}
        onClick={() => dispatch(setNav(EPomodoroNav.SHORT_BREAK))}
      >
        Short Break
      </Button>
      <Button
        type="primary"
        style={{ backgroundColor: "transparent" }}
        data-isactive={navSelector === EPomodoroNav.LONG_BREAK}
        onClick={() => dispatch(setNav(EPomodoroNav.LONG_BREAK))}
      >
        Long Break
      </Button>
    </div>
  );
};
