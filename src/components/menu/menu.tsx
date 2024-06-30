import classNames from "classnames";
import styles from "./menu.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  isMenuOpenSelector,
  isRoomSelectorOpenSelector,
} from "../../store/app/app.selector";
import {
  closeMenu,
  closeRoomSelector,
  toggleMenu,
} from "../../store/app/app.slice";
import { Nav } from "../nav/nav";
import { CSSTransition } from "react-transition-group";
import Logo from "../../../public/euro-logo.png";
import { Link } from "react-router-dom";
import { ROUTE_LIST } from "../../router/route-list";
import { BREAKPOINTS, useBreakPoint } from "../../hooks";

export const Menu = (): JSX.Element => {
  const isOpen = useSelector(isMenuOpenSelector);
  const isSelectorOpen = useSelector(isRoomSelectorOpenSelector);
  const BP = useBreakPoint();

  const cn = {
    [styles.menu]: true,
    [styles.isOpen]: isOpen,
  };

  const dispatch = useDispatch();
  const close = () => {
    dispatch(closeMenu());
    dispatch(closeRoomSelector());
  };

  const onClick = () => {
    BP !== BREAKPOINTS.xl && dispatch(toggleMenu());
    dispatch(closeRoomSelector());
  };

  return (
    <>
      <aside className={classNames(cn)} onClick={onClick}>
        <div className={styles.icon} />
        {BP === BREAKPOINTS.xl && (
          <Link to={ROUTE_LIST.home} className={styles.logo}>
            <img alt="logo" src={Logo} />
          </Link>
        )}
        <Nav />
      </aside>
      <CSSTransition
        in={isOpen || isSelectorOpen}
        timeout={200}
        classNames="fade"
        unmountOnExit
      >
        <div className={styles.hover} onClick={close} />
      </CSSTransition>
    </>
  );
};
