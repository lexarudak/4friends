import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../components/table/table";
import styles from "./statistic-page.module.scss";
import { statisticSelector } from "../../store/statistic/statistic.selector";
import { useLazyTotalScoreQuery } from "../../store/api";
import { useEffect } from "react";
import {
  setAverage,
  setExact,
  setTable,
  setWins,
} from "../../store/statistic/statistic.slice";
import { activeRoomIdSelector } from "../../store/user/user.selector";
import { setIsPageLoading } from "../../store/app/app.slice";
import { useLang } from "../../lang/useLang";

export const StatisticPage = (): JSX.Element => {
  const { table, exact, wins, average } = useSelector(statisticSelector);
  const dispatch = useDispatch();
  const ACTIVEROOMID = useSelector(activeRoomIdSelector);
  const [fetchTable, { data, isSuccess }] = useLazyTotalScoreQuery();
  const {
    messages: { stat },
  } = useLang();

  useEffect(() => {
    if (ACTIVEROOMID) {
      fetchTable({});
      if (data && data.SUCCESS) {
        dispatch(setTable(data.DATA.MAINTABLE));
        dispatch(setWins(data.DATA.WINS));
        dispatch(setAverage(data.DATA.AVERAGE));
        dispatch(setExact(data.DATA.EXACT));
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
      <h2 className={styles.title}>{stat.title}</h2>
      <Table users={table} title={stat.total} items={10} />
      <Table users={exact} title={stat.exact} items={10} />
      <Table users={wins} title={stat.wins} items={10} />
      <Table users={average} title={stat.average} items={10} />
    </section>
  );
};
