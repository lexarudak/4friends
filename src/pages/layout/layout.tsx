import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./layout.module.scss";
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
import { LangToggler } from "../../components/lang-toggler/lang-toggler";
import { useIsLogin } from "../../hooks";

const regPages: string[] = [ROUTE_LIST.login, ROUTE_LIST.register];

const freePages: string[] = [
  ROUTE_LIST.login,
  ROUTE_LIST.register,
  ROUTE_LIST.rules,
];

export const Layout = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useIsLogin();
  const { isLoading, data } = useUserQuery({});
  const isPageLoading = useSelector(pageLoadingSelector);
  const { pathname } = useLocation();
  const { isMenuOpen, isModalOpen, isRoomSelectorOpen } =
    useSelector(appSelector);
  const severError = useSelector(isServerErrorSelector);

  const showMainLoading = isLoading || isPageLoading;
  const shouldRedirectFromLogin =
    !severError.isError && regPages.includes(pathname) && isLogin;
  const shouldRedirectToLogin =
    severError.isError && !freePages.includes(pathname);
  const shouldHoldBody = isMenuOpen || isModalOpen || isRoomSelectorOpen;
  const shouldShowRoomSelector = !regPages.includes(pathname) && isLogin;

  useEffect(() => {
    shouldHoldBody
      ? document.body.classList.add("hold")
      : document.body.classList.remove("hold");
  });

  useEffect(() => {
    if (!isLogin && !freePages.includes(pathname)) {
      dispatch(
        setServerError({
          isError: true,
          message: data?.MESSAGE || "Access token error",
        }),
      );
    }
    if (shouldRedirectToLogin) {
      Cookies.remove("TOKEN", { path: "/", domain: ".4friends.live" });
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
    isLogin,
  ]);

  return (
    <>
      {shouldShowRoomSelector && <RoomSelector />}
      <Menu />
      <LangToggler
        className={{
          [styles.toggler]: true,
          [styles.isOpen]: isMenuOpen,
        }}
      />
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
