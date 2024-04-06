import { Outlet, useLocation } from "react-router-dom";
import styles from "./layout.module.scss";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { Menu } from "../../components/menu/menu";
import { ROUTE_LIST } from "../../router/route-list";

const noMenuList: string[] = [ROUTE_LIST.login, ROUTE_LIST.register];

export const Layout = (): JSX.Element => {
  const { pathname } = useLocation();
  const showMenu = !noMenuList.includes(pathname);
  return (
    <>
      {showMenu && <Header />}
      {showMenu && <Menu />}
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
