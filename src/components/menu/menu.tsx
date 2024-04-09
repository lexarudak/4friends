import classNames from "classnames";
import styles from "./menu.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { isMenuOpenSelector } from "../../store/app/app.selector";
import { closeMenu } from "../../store/app/app.slice";
import { Nav } from "../nav/nav";
import { CSSTransition } from "react-transition-group";

export const Menu = (): JSX.Element => {
  const isOpen = useSelector(isMenuOpenSelector);

  const cn = {
    [styles.menu]: true,
    [styles.isOpen]: isOpen,
  };

  const dispatch = useDispatch();
  const close = () => {
    dispatch(closeMenu());
  };

  return (
    <>
      <aside className={classNames(cn)}>
        <Nav />
      </aside>
      <CSSTransition in={isOpen} timeout={200} classNames="fade" unmountOnExit>
        <div className={styles.hover} onClick={close} />
      </CSSTransition>
    </>
  );
};
