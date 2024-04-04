import { useEffect, useState } from "react";

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
