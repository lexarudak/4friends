import { ButtonHTMLAttributes, FC } from "react";
import styles from "./button.module.scss";
import classNames from "classnames";
import { BUTTON_COLOR, BUTTON_VARIANT } from "../../const/const";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: BUTTON_VARIANT;
  color: BUTTON_COLOR;
};

export const Button: FC<Props> = ({
  variant,
  color,
  className,
  children,
  ...rest
}): JSX.Element => {
  const mods: Record<string, boolean> = {
    [styles[variant]]: true,
    [styles[color]]: true,
  };
  return (
    <button {...rest} className={classNames(styles.button, mods, className)}>
      {children}
    </button>
  );
};
