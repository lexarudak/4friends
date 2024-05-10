import { Link, useLocation } from "react-router-dom";
import { ROUTE_LIST } from "../../router/route-list";
import styles from "./nav.module.scss";
import { Button } from "../button/button";
import { useDispatch } from "react-redux";
import { closeMenu } from "../../store/app/app.slice";
import Cookies from "js-cookie";
import { clearUser } from "../../store/user/user.slice";
import { setTable } from "../../store/statistic/statistic.slice";
import { setNextMatches } from "../../store/next-matches/next-matches.slice";
import { useLang } from "../../lang/useLang";
import { BUTTON_COLOR, BUTTON_VARIANT } from "../../const/const";

const NAV_LIST = {
  home: ROUTE_LIST.home,
  matchdays: ROUTE_LIST.matchdays,
  statistic: ROUTE_LIST.statistic,
  globalTop: ROUTE_LIST.top,
  rules: ROUTE_LIST.rules,
};

export const Nav = (): JSX.Element => {
  const dispatch = useDispatch();
  const {
    messages: { menu },
  } = useLang();
  const { pathname } = useLocation();
  const close = () => {
    dispatch(closeMenu());
  };

  const logout = () => {
    Cookies.remove("TOKEN", { path: "/", domain: ".4friends.live" });

    dispatch(clearUser());
    dispatch(setNextMatches([]));
    dispatch(setTable([]));

    close();
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
          {menu[name]}
        </Link>
      ))}
      <Link to={ROUTE_LIST.login}>
        <Button
          onClick={logout}
          variant={BUTTON_VARIANT.fill}
          color={BUTTON_COLOR.primary}
        >
          {menu.logout}
        </Button>
      </Link>
    </nav>
  );
};
