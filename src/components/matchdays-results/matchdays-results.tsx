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
import { useEffect, useState } from "react";
import { validateDate } from "../../helpers";
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

export const MatchdaysResults = (): JSX.Element => {
  const data = useSelector(matchdaysMatchesSelector);
  const { from, to } = useSelector(matchdaysDateSelector);
  const ACTIVEROOMID = useSelector(activeRoomIdSelector);
  const [isValid, setIsValid] = useState(true);
  const severError = useSelector(isServerErrorSelector);
  const pickedCountry = useSelector(countrySelector);
  const isInit = useSelector(initMatchdaysSelector);
  const dispatch = useDispatch();
  const {
    messages: { md },
    countries,
  } = useLang();

  const getValidMatch = ({ TIME }: OldMatchInfo) =>
    TIME >= new Date(from).valueOf() && TIME <= new Date(to).valueOf();

  const getValidCountry = ({ TEAM1, TEAM2 }: OldMatchInfo) => {
    const searchValue = pickedCountry.trim().toUpperCase();
    return (
      !searchValue ||
      [
        countries[TEAM1.CODE]?.code3,
        countries[TEAM2.CODE]?.code3,
        countries[TEAM1.CODE]?.name.toUpperCase(),
        countries[TEAM2.CODE]?.name.toUpperCase(),
      ]
        .filter((val) => !!val)
        .some((value) => value.startsWith(searchValue))
    );
  };

  const [fetch, { isFetching }] = useLazyGetMatchdaysQuery();

  useEffect(() => {
    fetch({ from, to });
  }, []);

  useEffect(() => {
    const isValid = validateDate(from, to);
    setIsValid(isValid);
    if (isValid) {
      fetch({ from, to });
    }
  }, [fetch, from, to, ACTIVEROOMID]);

  const clearFilter = () => {
    dispatch(resetMatchdays());
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

      {data.filter(getValidMatch).filter(getValidCountry).length && isValid
        ? [...data]
            .filter(getValidMatch)
            .filter(getValidCountry)
            .sort((a, b) => b.TIME - a.TIME)
            .map((data) => <OldMatch matchInfo={data} key={data.ID} />)
        : !isFetching && <div>{md.noMatches}</div>}
    </section>
  );
};
