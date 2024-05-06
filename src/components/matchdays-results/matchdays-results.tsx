import { useSelector } from "react-redux";
import styles from "./matchdays-results.module.scss";
import {
  matchdaysDateSelector,
  matchdaysMatchesSelector,
} from "../../store/matchdays/matchdays.selector";
import { OldMatch } from "./old-match/old-match";
import { useLazyGetMatchdaysQuery } from "../../store/api";
import { useEffect, useState } from "react";
import { validateDate } from "../../helpers";
import { Loading } from "../loading/loading";
import { activeRoomIdSelector } from "../../store/user/user.selector";
import { BUTTON_COLOR, BUTTON_VARIANT, Button } from "../button/button";
import { isServerErrorSelector } from "../../store/app/app.selector";
import { FieldError } from "../../pages/auth/field-error";

export const MatchdaysResults = (): JSX.Element => {
  const data = useSelector(matchdaysMatchesSelector);
  const { from, to } = useSelector(matchdaysDateSelector);
  const ACTIVEROOMID = useSelector(activeRoomIdSelector);
  const [isValid, setIsValid] = useState(true);
  const severError = useSelector(isServerErrorSelector);

  const getValidMatch = ({ TIME }: { TIME: number }) =>
    TIME >= new Date(from).valueOf() && TIME <= new Date(to).valueOf();

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
            Refresh
          </Button>
          <Loading loading={isFetching} />
        </div>
        <FieldError message={severError.message} className={styles.error} />
      </div>

      {data.filter(getValidMatch).length && isValid
        ? [...data]
            .filter(getValidMatch)
            .sort((a, b) => a.TIME - b.TIME)
            .map((data) => <OldMatch matchInfo={data} key={data.ID} />)
        : !isFetching && <div>No matches on these dates</div>}
    </section>
  );
};
