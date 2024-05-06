import { useEffect } from "react";
import { DateSelector } from "../../components/date-selector/date-selector";
import { MatchdaysResults } from "../../components/matchdays-results/matchdays-results";
import styles from "./matchdays-page.module.scss";
import { useDispatch } from "react-redux";
import { setIsPageLoading } from "../../store/app/app.slice";
import { TeamSelector } from "../../components/team-selector/team-selector";

export const MatchdaysPage = (): JSX.Element => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsPageLoading(false));
  }, []);
  return (
    <section className={styles.page}>
      <h2 className={styles.title}>MATCHDAYS</h2>
      <DateSelector />
      <TeamSelector />
      <MatchdaysResults />
    </section>
  );
};
