import { Link } from "react-router-dom";
import { ROUTE_LIST } from "../../router/route-list";
import styles from "./nav.module.scss";
import { BUTTON_COLOR, BUTTON_VARIANT, Button } from "../button/button";
import { useDispatch } from "react-redux";
import { closeMenu } from "../../store/app/app.slice";

const NAV_LIST = {
  Home: ROUTE_LIST.home,
  MATCHDAYS: ROUTE_LIST.matchdays,
  Stats: ROUTE_LIST.statistic,
};

export const Nav = (): JSX.Element => {
  const dispatch = useDispatch();
  const close = () => {
    dispatch(closeMenu());
  };

  const logout = () => {
    close();
    console.log("LOG OUT");
  };

  return (
    <nav className={styles.nav}>
      {Object.entries(NAV_LIST).map(([name, link]) => (
        <Link title={name} to={link} onClick={close} key={name}>
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
