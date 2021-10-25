import { FunctionComponent, HTMLAttributes, ReactNode } from "react";
import style from "./IconButton.module.scss";

export interface IIconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  openOrientation?: "left" | "right";
}

/**
 * Icon button react component.
 *
 * @return Tsx
 */
export const IconButton: FunctionComponent<IIconButtonProps> = ({
  children,
  className,
  icon,
  openOrientation = "right",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${style.container}${!!className ? ` ${className}` : ""}`}
    >
      {!!icon && openOrientation === "right" && (
        <span className={style.icon}>{icon}</span>
      )}
      <span className={style.children} data-orientation={openOrientation}>
        {children}
      </span>
      {!!icon && openOrientation === "left" && (
        <span className={style.icon}>{icon}</span>
      )}
    </button>
  );
};
