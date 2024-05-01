import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../components/table/table";
import styles from "./statistic-page.module.scss";
import { statisticSelector } from "../../store/statistic/statistic.selector";
import { useLazyTotalScoreQuery } from "../../store/api";
import { useEffect } from "react";
import { setTable } from "../../store/statistic/statistic.slice";
import { activeRoomIdSelector } from "../../store/user/user.selector";
import { setIsPageLoading } from "../../store/app/app.slice";

export const StatisticPage = (): JSX.Element => {
  const { table, exact, wins, average } = useSelector(statisticSelector);
  const dispatch = useDispatch();
  const ACTIVEROOMID = useSelector(activeRoomIdSelector);
  const [fetchTable, { data, isSuccess }] = useLazyTotalScoreQuery();

  useEffect(() => {
    if (ACTIVEROOMID) {
      fetchTable({});
      if (data && data.SUCCESS) {
        dispatch(setTable(data.DATA));
      }
    }
  }, [data, dispatch, fetchTable, ACTIVEROOMID]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setIsPageLoading(false));
    }
  }, [dispatch, isSuccess]);

  return (
    <section className={styles.page}>
      <h2 className={styles.title}>Statistic</h2>
      <Table users={table} title="Total Score" />
      <Table users={exact} title="Exact Score Hits" />
      <Table users={wins} title="Predicted Wins" />
      <Table users={average} title="Average Points per Match" />
    </section>
  );
};
