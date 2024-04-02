// import { NextMatches } from "../../components/next-matches/next-matches";
import { Table } from "../../components/table/table";
import { Timer } from "../../components/timer/timer";
import styles from "./home-page.module.scss";

export const HomePage = (): JSX.Element => {
  return (
    <section className={styles.page}>
      <Timer className={styles.timer} />
      {/* <NextMatches /> */}
      <Table />
      <Table />
      <Table />
      <Table />
    </section>
  );
};
