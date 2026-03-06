import { useSelector } from "react-redux";
import { matchdaysMatchesSelector } from "../../store/matchdays/matchdays.selector";
import styles from "./live-matches.module.scss";
import { useLazyGetMatchdaysQuery } from "../../store/api";
import { useEffect } from "react";
import dayjs from "dayjs";
import { activeRoomIdSelector } from "../../store/user/user.selector";
import { OldMatch } from "../matchdays-results/old-match/old-match";
import { getLiveMatches } from "../../helpers";

export const LiveMatches = () => {
  const matches = useSelector(matchdaysMatchesSelector);
  const [fetchMatches] = useLazyGetMatchdaysQuery();
  const ACTIVEROOMID = useSelector(activeRoomIdSelector);

  useEffect(() => {
    const fetchM = () => {
      fetchMatches({
        from: dayjs()
          .subtract(1, "day")
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        to: dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      });
    };
    if (ACTIVEROOMID) {
      fetchM();

      const interval = setInterval(fetchM, 60000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [ACTIVEROOMID, fetchMatches]);

  return matches.filter(getLiveMatches).length ? (
    <section className={styles.container}>
      <h2 className={styles.inProgress}>Live</h2>
      {[...matches]
        .filter(getLiveMatches)
        .sort((a, b) => b.TIME - a.TIME)
        .map((data) => (
          <OldMatch matchInfo={data} key={data.ID} />
        ))}
    </section>
  ) : null;
};
