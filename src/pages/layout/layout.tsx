import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
  isServerErrorSelector,
} from "../../store/app/app.selector";
import { RoomSelector } from "../../components/room-selector/room-selector";
import { useUserQuery } from "../../store/api";
import { FirstLoading } from "../../components/loading/first-loading";

const regPages: string[] = [ROUTE_LIST.login, ROUTE_LIST.register];

export const Layout = (): JSX.Element => {
  const { isLoading, isFetching } = useUserQuery({});
  const { pathname } = useLocation();
  const showMenu = !regPages.includes(pathname);
  const isMenuOpen = useSelector(isMenuOpenSelector);
  const isModalOpen = useSelector(isModalOpenSelector);
  const severError = useSelector(isServerErrorSelector);
  const showMainLoading =
    (isLoading || severError.isError) && !regPages.includes(pathname);
  const navigate = useNavigate();

  useEffect(() => {
    isMenuOpen || isModalOpen
      ? document.body.classList.add("hold")
      : document.body.classList.remove("hold");
  });

  useEffect(() => {
    console.log({ isLoading, isFetching });
  }, [isFetching, isLoading]);

  useEffect(() => {
    if (severError.isError && !regPages.includes(pathname)) {
      console.log(severError.message);
      navigate(ROUTE_LIST.login);
    }
  }, [severError, navigate, pathname]);

  return (
    <>
      {showMenu && <Header />}
      {showMenu && <Menu />}
      {showMenu && <RoomSelector />}
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      {showMainLoading && <FirstLoading />}
    </>
  );
};
