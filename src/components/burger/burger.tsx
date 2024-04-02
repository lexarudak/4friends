import classNames from "classnames";
import { BUTTON_COLOR, BUTTON_VARIANT, Button } from "../button/button";
import styles from "./burger.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { isMenuOpenSelector } from "../../store/app/app.selector";
import { toggleMenu } from "../../store/app/app.slice";

export const Burger = (): JSX.Element => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector(isMenuOpenSelector);

  const onClick = () => {
    dispatch(toggleMenu());
  };

  const mods: Record<string, boolean> = {
    [styles.isOpen]: isMenuOpen,
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
