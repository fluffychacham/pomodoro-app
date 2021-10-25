import React, { ButtonHTMLAttributes, FunctionComponent } from "react";

import style from "./Button.module.scss";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "danger";
}

/**
 * Button
 *
 * @returns Tsx
 */
const Button: FunctionComponent<IButtonProps> = ({
  children,
  className,
  size = "md",
  color = "primary",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${style.container}${!!className ? ` ${className}` : ""}`}
      data-color={color}
      data-size={size}
    >
      {children}
    </button>
  );
};

export default Button;
