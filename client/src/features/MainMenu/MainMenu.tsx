import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../../stores/MenuSlice";
import { RootState } from "../../stores/store";

import style from "./MainMenu.module.scss";

// Set main menu strings here.
const CLOSE_TEXT = "Close";
const MENU_TEXT = "Menu";
const POMODORO_TEXT = "Pomodoro";
const TASK_LIST_TEXT = "Task List";

/**
 * Menu react component.
 *
 * @return Tsx
 */
export const MainMenu: FunctionComponent = () => {
  const dispatch = useDispatch();
  const menuSelector = useSelector((state: RootState) => state.menu);

  return <div className={style.container}>Main Menu</div>;
};
