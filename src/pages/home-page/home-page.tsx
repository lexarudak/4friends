import { useDispatch, useSelector } from "react-redux";
import { NextMatches } from "../../components/next-matches/next-matches";
import { Table } from "../../components/table/table";
import { Timer } from "../../components/timer/timer";
import styles from "./home-page.module.scss";
import { tableSelector } from "../../store/statistic/statistic.selector";
import { useLazyTotalScoreQuery } from "../../store/api";
import { useEffect } from "react";
import { setTable } from "../../store/statistic/statistic.slice";
import { activeRoomSelector } from "../../store/user/user.selector";

export const HomePage = (): JSX.Element => {
  const dispatch = useDispatch();
  const users = useSelector(tableSelector);
  const activeRoom = useSelector(activeRoomSelector);
  const [fetchTable, { data }] = useLazyTotalScoreQuery();

  useEffect(() => {
    fetchTable({});
    console.log(data);
    if (data && data.SUCCESS) {
      dispatch(setTable(data.DATA));
    }
  }, [data, dispatch, fetchTable, activeRoom]);

  return (
    <section className={styles.page}>
      <Timer className={styles.timer} />
      <NextMatches />
      <Table users={users} title="Table" moreStatistic />
    </section>
  );
};
