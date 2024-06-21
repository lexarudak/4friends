import { useDispatch, useSelector } from "react-redux";
import styles from "./matchdays-results.module.scss";
import {
  countrySelector,
  initMatchdaysSelector,
  matchdaysDateSelector,
  matchdaysMatchesSelector,
} from "../../store/matchdays/matchdays.selector";
import { OldMatch } from "./old-match/old-match";
import { useLazyGetMatchdaysQuery } from "../../store/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getLiveMatches, getRestMatches, validateDate } from "../../helpers";
import { Loading } from "../loading/loading";
import { activeRoomIdSelector } from "../../store/user/user.selector";
import { Button } from "../button/button";
import { isServerErrorSelector } from "../../store/app/app.selector";
import { FieldError } from "../../pages/auth/field-error";
import {
  OldMatchInfo,
  resetMatchdays,
} from "../../store/matchdays/matchdays.slice";
import { useLang } from "../../lang/useLang";
import { BUTTON_COLOR, BUTTON_VARIANT } from "../../const/const";
import classNames from "classnames";

export const MatchdaysResults = (): JSX.Element => {
  const data = useSelector(matchdaysMatchesSelector);
  const { from, to } = useSelector(matchdaysDateSelector);
  const ACTIVEROOMID = useSelector(activeRoomIdSelector);
  const [isValid, setIsValid] = useState(true);
  const severError = useSelector(isServerErrorSelector);
  const pickedCountry = useSelector(countrySelector);
  const isInit = useSelector(initMatchdaysSelector);
  const dispatch = useDispatch();
  const defaultSortDir = localStorage.getItem("sortMatchdays") ?? "down";
  const [sortDir, setSortDir] = useState<string>(defaultSortDir);
  const isCountryOpen = JSON.parse(
    localStorage.getItem("isCountryOpen") ?? "true",
  );
  const {
    messages: { md },
    countries,
  } = useLang();

  const getValidMatch = useCallback(
    ({ TIME }: OldMatchInfo) =>
      TIME >= new Date(from).valueOf() && TIME <= new Date(to).valueOf(),
    [from, to],
  );

  const getValidCountry = useCallback(
    ({ TEAM1, TEAM2 }: OldMatchInfo) => {
      const searchValue = pickedCountry.trim().toUpperCase();
      return (
        !searchValue ||
        !isCountryOpen ||
        [
          countries[TEAM1.CODE]?.code3,
          countries[TEAM2.CODE]?.code3,
          countries[TEAM1.CODE]?.name.toUpperCase(),
          countries[TEAM2.CODE]?.name.toUpperCase(),
        ]
          .filter((val) => !!val)
          .some((value) => value.startsWith(searchValue))
      );
    },
    [countries, isCountryOpen, pickedCountry],
  );

  const [fetch, { isFetching }] = useLazyGetMatchdaysQuery();

  useEffect(() => {
    const updateInfo = () => {
      const isValid = validateDate(from, to);
      setIsValid(isValid);
      if (isValid) {
        fetch({ from, to });
      }
    };
    updateInfo();

    const interval = setInterval(updateInfo, 120000);

    return () => {
      clearInterval(interval);
    };
  }, [fetch, from, to, ACTIVEROOMID]);

  const clearFilter = () => {
    dispatch(resetMatchdays());
  };

  const matches = useMemo(
    () => data.filter(getValidMatch).filter(getValidCountry),
    [data, getValidMatch, getValidCountry],
  );

  const getSortedLive = matches
    .filter(getLiveMatches)
    .sort((a, b) => b.TIME - a.TIME)
    .map((data) => <OldMatch matchInfo={data} key={data.ID} />);

  const getSortedRest = matches
    .filter(getRestMatches)
    .sort((a, b) => b.TIME - a.TIME)
    .map((data) => <OldMatch matchInfo={data} key={data.ID} />);

  useEffect(() => {
    localStorage.setItem("sortMatchdays", sortDir);
  }, [sortDir]);

  const toggleSortDir = () => {
    setSortDir((prev) => (prev === "up" ? "down" : "up"));
  };

  return (
    <section className={styles.container}>
      <div className={styles.refreshBlock}>
        <div className={styles.btnContainer}>
          <Button
            color={BUTTON_COLOR.active}
            variant={BUTTON_VARIANT.fill}
            onClick={() => fetch({ from, to })}
            disabled={!isValid || isFetching}
          >
            {md.refresh}
          </Button>
          <Button
            color={BUTTON_COLOR.active}
            variant={BUTTON_VARIANT.contour}
            onClick={clearFilter}
            disabled={isFetching || isInit}
          >
            {md.clear}
          </Button>
          <Loading loading={isFetching} />
        </div>
        <FieldError message={severError.message} className={styles.error} />
      </div>
      <button onClick={toggleSortDir} className={styles.sorter}>
        <span
          className={classNames(styles.sorter, {
            [styles.up]: sortDir === "up",
          })}
        >
          &#9660;
        </span>
      </button>

      {matches.length && isValid ? (
        <>
          {getSortedLive}
          {getSortedRest}
        </>
      ) : (
        !isFetching && <div>{md.noMatches}</div>
      )}
    </section>
  );
};
