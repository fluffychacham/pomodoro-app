import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { toggle } from "../../stores/MenuSlice";
import style from "./MenuButton.module.scss";

/**
 * Menu button react component.
 *
 * @return Tsx
 */
export const MenuButton: FunctionComponent = () => {
  const dispatch = useDispatch();

  const handleMenuButtonClick = () => {
    dispatch(toggle());
  };

  return <button>menu button</button>;
};
