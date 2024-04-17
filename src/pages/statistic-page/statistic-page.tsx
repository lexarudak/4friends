import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../components/table/table";
import styles from "./statistic-page.module.scss";
import { statisticSelector } from "../../store/statistic/statistic.selector";
import { useLazyTotalScoreQuery } from "../../store/api";
import { useEffect } from "react";
import { setTable } from "../../store/statistic/statistic.slice";
import { activeRoomIdSelector } from "../../store/user/user.selector";

export const StatisticPage = (): JSX.Element => {
  const { table, exact, wins, average } = useSelector(statisticSelector);
  const dispatch = useDispatch();
  const ACTIVEROOMID = useSelector(activeRoomIdSelector);
  const [fetchTable, { data }] = useLazyTotalScoreQuery();

  useEffect(() => {
    if (ACTIVEROOMID) {
      fetchTable({});
      if (data && data.SUCCESS) {
        dispatch(setTable(data.DATA));
      }
    }
  }, [data, dispatch, fetchTable, ACTIVEROOMID]);

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
