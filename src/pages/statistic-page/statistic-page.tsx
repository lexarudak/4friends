import { useSelector } from "react-redux";
import { Table } from "../../components/table/table";
import styles from "./statistic-page.module.scss";
import { statisticSelector } from "../../store/statistic/statistic.selector";

export const StatisticPage = (): JSX.Element => {
  const { table, exact, wins, average } = useSelector(statisticSelector);
  return (
    <section className={styles.page}>
      <h2 className={styles.title}>Statistic</h2>
      <Table users={table} title="Total Score" usePositions />
      <Table users={exact} title="Exact Score Hits" usePositions />
      <Table users={wins} title="Predicted Wins" usePositions />
      <Table users={average} title="Average Points per Match" usePositions />
    </section>
  );
};
