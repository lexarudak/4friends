import { DateSelector } from "../../components/date-selector/date-selector";
import { MatchdaysResults } from "../../components/matchdays-results/matchdays-results";
import styles from "./matchdays-page.module.scss";

export const MatchdaysPage = (): JSX.Element => {
  return (
    <section className={styles.page}>
      <h2 className={styles.title}>MATCHDAYS</h2>
      <DateSelector />
      <MatchdaysResults />
    </section>
  );
};
