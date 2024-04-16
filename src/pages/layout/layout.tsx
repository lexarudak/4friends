import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./layout.module.scss";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { Menu } from "../../components/menu/menu";
import { ROUTE_LIST } from "../../router/route-list";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  appSelector,
  isServerErrorSelector,
} from "../../store/app/app.selector";
import { RoomSelector } from "../../components/room-selector/room-selector";
import { useUserQuery } from "../../store/api";
import { FirstLoading } from "../../components/loading/first-loading";
import Cookies from "js-cookie";
import { setServerError } from "../../store/app/app.slice";

const regPages: string[] = [ROUTE_LIST.login, ROUTE_LIST.register];

export const Layout = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, data } = useUserQuery({});
  const { pathname } = useLocation();
  const { isMenuOpen, isModalOpen, isRoomSelectorOpen } =
    useSelector(appSelector);
  const severError = useSelector(isServerErrorSelector);

  const showMainLoading =
    (isLoading || severError.isError) && !regPages.includes(pathname);
  const shouldRedirectFromLogin =
    !severError.isError && regPages.includes(pathname) && Cookies.get("TOKEN");
  const shouldRedirectToLogin =
    severError.isError && !regPages.includes(pathname);
  const shouldHoldBody = isMenuOpen || isModalOpen || isRoomSelectorOpen;
  const shouldShowMenu = !regPages.includes(pathname);

  useEffect(() => {
    shouldHoldBody
      ? document.body.classList.add("hold")
      : document.body.classList.remove("hold");
  });

  useEffect(() => {
    if (shouldRedirectToLogin) {
      Cookies.remove("TOKEN", { path: "/", domain: ".4friends.live" });
      dispatch(
        setServerError({
          isError: true,
          message: data?.MESSAGE || "Access token error",
        }),
      );
      navigate(ROUTE_LIST.login);
    }

    if (shouldRedirectFromLogin) {
      navigate(ROUTE_LIST.home);
    }
  }, [
    shouldRedirectFromLogin,
    pathname,
    navigate,
    shouldRedirectToLogin,
    dispatch,
    data?.MESSAGE,
  ]);

  return (
    <>
      {shouldShowMenu && (
        <>
          <Header />
          <Menu />
          <RoomSelector />
        </>
      )}

      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />

      {showMainLoading && <FirstLoading />}
    </>
  );
};
