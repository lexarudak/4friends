import { Outlet, useLocation } from "react-router-dom";
import styles from "./layout.module.scss";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { Menu } from "../../components/menu/menu";
import { ROUTE_LIST } from "../../router/route-list";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  isMenuOpenSelector,
  isModalOpenSelector,
} from "../../store/app/app.selector";
import { RoomSelector } from "../../components/room-selector/room-selector";

const noMenuList: string[] = [ROUTE_LIST.login, ROUTE_LIST.register];

export const Layout = (): JSX.Element => {
  const { pathname } = useLocation();
  const showMenu = !noMenuList.includes(pathname);
  const isMenuOpen = useSelector(isMenuOpenSelector);
  const isModalOpen = useSelector(isModalOpenSelector);

  useEffect(() => {
    isMenuOpen || isModalOpen
      ? document.body.classList.add("hold")
      : document.body.classList.remove("hold");
  });

  return (
    <>
      {showMenu && <Header />}
      {showMenu && <Menu />}
      {showMenu && <RoomSelector />}
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
