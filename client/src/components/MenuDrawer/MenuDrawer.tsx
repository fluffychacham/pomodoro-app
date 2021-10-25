import { CloseOutlined } from "@material-ui/icons";
import { FunctionComponent, ReactNode, useState } from "react";
import { useTimeout } from "../../utils/hooks/UseTimeout";

import style from "./MenuDrawer.module.scss";

// Set menu drawer related texts here.
const CLOSE_TEXT = "Close";

interface IMenuDrawerProps {
  isOpen: boolean;
  toggle?: () => boolean;

  items?: ReactNode[];
  bottomItems?: ReactNode[];
}

/**
 * Menu drawer react component.
 *
 * Component used for adding navigation to the app.
 *
 * @return Tsx
 */
export const MenuDrawer: FunctionComponent<IMenuDrawerProps> = ({
  isOpen,
  toggle,
  children,
  items,
  bottomItems,
}) => {
  return (
    <div data-isopen={isOpen} className={style.container}>
      <div onClick={toggle} className={style.menuMask}></div>
      <div className={style.menu}>
        <button onClick={toggle} className={style.menuCloseButton}>
          <CloseOutlined />
          {CLOSE_TEXT}
        </button>
        <div className={style.drawerChildren}>{children}</div>
        {(items || []).length > 0 && (
          <div className={style.itemContainer}>
            {items?.map((item) => item)}
          </div>
        )}
        {(bottomItems || []).length > 0 && (
          <div className={style.bottomItemContainer}>
            {bottomItems?.map((item) => item)}
          </div>
        )}
      </div>
    </div>
  );
};
