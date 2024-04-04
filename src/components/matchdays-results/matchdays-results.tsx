import { useSelector } from "react-redux";
import styles from "./matchdays-results.module.scss";
import { matchdaysMatchesSelector } from "../../store/matchdays/matchdays.selector";
import { OldMatch } from "./old-match/old-match";

export const MatchdaysResults = (): JSX.Element => {
  const data = useSelector(matchdaysMatchesSelector);
  return (
    <section className={styles.container}>
      {data.length ? (
        data.map((data) => <OldMatch matchInfo={data} key={data.id} />)
      ) : (
        <div>No results</div>
      )}
    </section>
  );
};
