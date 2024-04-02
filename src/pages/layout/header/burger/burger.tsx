import classNames from "classnames";
import {
  BUTTON_COLOR,
  BUTTON_VARIANT,
  Button,
} from "../../../../components/button/button";
import styles from "./burger.module.scss";
import { useState } from "react";

export const Burger = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen((prev) => !prev);
  };

  const mods: Record<string, boolean> = {
    [styles.isOpen]: isOpen,
  };

  return (
    <Button
      variant={BUTTON_VARIANT.round}
      color={BUTTON_COLOR.secondary}
      onClick={onClick}
    >
      <div className={styles.burger}>
        <div className={classNames(styles.str, styles.top, mods)} />
        <div className={classNames(styles.str, styles.mid, mods)} />
        <div className={classNames(styles.str, styles.bot, mods)} />
      </div>
    </Button>
  );
};
