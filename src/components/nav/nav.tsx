import { Link, useLocation } from "react-router-dom";
import { ROUTE_LIST } from "../../router/route-list";
import styles from "./nav.module.scss";
import { BUTTON_COLOR, BUTTON_VARIANT, Button } from "../button/button";
import { useDispatch } from "react-redux";
import { closeMenu } from "../../store/app/app.slice";
import Cookies from "js-cookie";

const NAV_LIST = {
  Home: ROUTE_LIST.home,
  MATCHDAYS: ROUTE_LIST.matchdays,
  Stats: ROUTE_LIST.statistic,
  Rules: ROUTE_LIST.rules,
};

export const Nav = (): JSX.Element => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const close = () => {
    dispatch(closeMenu());
  };

  const logout = () => {
    Cookies.remove("TOKEN", { path: "/", domain: ".4friends.live" });
    close();
    console.log(" 2 LOG OUT");
  };

  return (
    <nav className={styles.nav}>
      {Object.entries(NAV_LIST).map(([name, link]) => (
        <Link
          title={name}
          to={link}
          onClick={close}
          className={link === pathname ? styles.active : ""}
          key={name}
        >
          {name}
        </Link>
      ))}
      <Link to={ROUTE_LIST.login}>
        <Button
          onClick={logout}
          variant={BUTTON_VARIANT.fill}
          color={BUTTON_COLOR.primary}
        >
          Log out
        </Button>
      </Link>
    </nav>
  );
};
