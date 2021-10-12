import { Button } from "antd";
import { FunctionComponent } from "react";
import { MenuOutlined } from "@ant-design/icons";

import style from "./MenuButton.module.scss";

/**
 * Menu button react component.
 *
 * @return Tsx
 */
export const MenuButton: FunctionComponent = () => {
  return (
    <Button
      type="primary"
      style={{ backgroundColor: "transparent" }}
      icon={<MenuOutlined />}
      className={style.container}
    ></Button>
  );
};
