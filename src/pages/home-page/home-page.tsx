import { useDispatch, useSelector } from "react-redux";
import { NextMatches } from "../../components/next-matches/next-matches";
import { Table } from "../../components/table/table";
import { Timer } from "../../components/timer/timer";
import styles from "./home-page.module.scss";
import { tableSelector } from "../../store/statistic/statistic.selector";
import {
  useLazyGetNextMatchesQuery,
  useLazyTotalScoreQuery,
} from "../../store/api";
import { useEffect } from "react";
import { setTable } from "../../store/statistic/statistic.slice";
import { activeRoomSelector } from "../../store/user/user.selector";
import { setNMIsFetching } from "../../store/next-matches/next-matches.slice";

export const HomePage = (): JSX.Element => {
  const dispatch = useDispatch();
  const users = useSelector(tableSelector);
  const activeRoom = useSelector(activeRoomSelector);
  const [fetchTable, { data }] = useLazyTotalScoreQuery();
  const [fetchNextMatches, { isFetching }] = useLazyGetNextMatchesQuery();

  useEffect(() => {
    if (activeRoom) {
      fetchTable({});
      fetchNextMatches({});
      console.log("FETCH", activeRoom);
    }
  }, [activeRoom, fetchNextMatches, fetchTable]);

  useEffect(() => {
    if (data && data.SUCCESS && data.DATA) {
      dispatch(setTable(data.DATA));
    }
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(setNMIsFetching(isFetching));
  }, [dispatch, isFetching]);

  return (
    <section className={styles.page}>
      <Timer className={styles.timer} />
      <NextMatches />
      <Table users={users} title="Table" moreStatistic />
    </section>
  );
};
