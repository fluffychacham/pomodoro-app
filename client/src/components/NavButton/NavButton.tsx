import { FunctionComponent, HTMLAttributes } from "react";

import style from "./NavButton.module.scss";

export interface INavButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

/**
 * Nav button react component.
 *
 * @return Tsx
 */
export const NavButton: FunctionComponent<INavButtonProps> = ({
  children,
  className,
  isActive = false,
  ...props
}) => {
  return (
    <button
      {...props}
      data-isactive={isActive}
      className={`${style.container}${!!className ? ` ${className}` : ""}`}
    >
      {children}
    </button>
  );
};
