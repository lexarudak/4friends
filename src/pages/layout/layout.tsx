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
  pageLoadingSelector,
} from "../../store/app/app.selector";
import { RoomSelector } from "../../components/room-selector/room-selector";
import { useUserQuery } from "../../store/api";
import { FirstLoading } from "../../components/loading/first-loading";
import Cookies from "js-cookie";
import { setIsPageLoading, setServerError } from "../../store/app/app.slice";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";

const regPages: string[] = [ROUTE_LIST.login, ROUTE_LIST.register];

export const Layout = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, data } = useUserQuery({});
  const isPageLoading = useSelector(pageLoadingSelector);
  const { pathname } = useLocation();
  const { isMenuOpen, isModalOpen, isRoomSelectorOpen } =
    useSelector(appSelector);
  const severError = useSelector(isServerErrorSelector);

  const showMainLoading = isLoading || isPageLoading;
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
    console.log({ pathname });
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
      dispatch(setIsPageLoading(true));
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

      <main
        className={classNames(styles.main, {
          [styles.login]: regPages.includes(pathname),
        })}
      >
        <Outlet />
      </main>
      <Footer />

      <CSSTransition
        in={showMainLoading}
        timeout={300}
        classNames="fastFade"
        unmountOnExit
      >
        <FirstLoading />
      </CSSTransition>
    </>
  );
};
