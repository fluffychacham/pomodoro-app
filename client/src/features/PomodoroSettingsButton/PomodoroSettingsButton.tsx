import { SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FunctionComponent } from "react";

import style from "./PomodoroSettingsButton.module.scss";

/**
 * Pomodoro settings button react component.
 *
 * @return Tsx
 */
export const PomodoroSettingsButton: FunctionComponent = () => {
  return (
    <Button
      type="primary"
      style={{ backgroundColor: "transparent" }}
      icon={<SettingOutlined />}
      className={style.container}
    ></Button>
  );
};
