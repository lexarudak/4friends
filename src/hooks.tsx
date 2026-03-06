import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { activeRoomIdSelector } from "./store/user/user.selector";
import { useSelector } from "react-redux";
import { MatchStatus } from "./store/matchdays/matchdays.slice";

export enum BREAKPOINTS {
  xs = 400,
  s = 470,
  m = 690,
  l = 1240,
  xl = 1400,
}

const breakpointsValues = Object.values(BREAKPOINTS).filter(
  (value) => typeof value === "number",
) as number[];

export const useBreakPoint = () => {
  const getBreakpoint = () => {
    let i = 0;
    while (i < breakpointsValues.length) {
      if (breakpointsValues[i] > window.innerWidth) {
        return breakpointsValues[i];
      }
      i++;
    }
    return BREAKPOINTS.xl;
  };
  const [breakpoint, setBreakpoint] = useState(getBreakpoint());

  useEffect(() => {
    const handleResize = () => setBreakpoint(getBreakpoint());
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakpoint;
};

export const useStatusText = (status: MatchStatus | undefined) => {
  const BP = useBreakPoint();
  if (!status) return null;
  const statusText = BP === BREAKPOINTS.xl ? status.LONG : status.SHORT;
  return statusText;
};

export const useInterval = (callback: () => void, delay: number) => {
  const initCallback = () => {};
  const savedCallback = useRef(initCallback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const ACTIVEROOMID = useSelector(activeRoomIdSelector);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsLogin(!!Cookies.get("TOKEN"));
  }, [pathname, ACTIVEROOMID]);

  return isLogin;
};
