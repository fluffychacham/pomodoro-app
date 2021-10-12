import { UnorderedListOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FunctionComponent } from "react";

import style from "./PomodoroTaskListButton.module.scss";

/**
 * Pomodoro task list button react component.
 *
 * @return Tsx
 */
export const PomodoroTaskListButton: FunctionComponent = () => {
  return (
    <Button
      type="primary"
      style={{ backgroundColor: "transparent" }}
      icon={<UnorderedListOutlined />}
      className={style.container}
    ></Button>
  );
};
