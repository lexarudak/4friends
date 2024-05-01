import { useDispatch, useSelector } from "react-redux";
import { NextMatches } from "../../components/next-matches/next-matches";
import { Table } from "../../components/table/table";
import { Timer } from "../../components/timer/timer";
import styles from "./home-page.module.scss";
import { tableSelector } from "../../store/statistic/statistic.selector";
import {
  useLazyGetNextMatchesQuery,
  useLazyTotalScoreQuery,
  useLazyGetNMTimeQuery,
} from "../../store/api";
import { useEffect } from "react";
import { setTable } from "../../store/statistic/statistic.slice";
import { activeRoomIdSelector } from "../../store/user/user.selector";
import { setNMIsFetching } from "../../store/next-matches/next-matches.slice";
import {
  nextMatchSelector,
  serverTimeDifSelector,
} from "../../store/app/app.selector";
import { useInterval } from "../../hooks";
import { setIsPageLoading } from "../../store/app/app.slice";

export const HomePage = (): JSX.Element => {
  const dispatch = useDispatch();
  const NMtime = useSelector(nextMatchSelector);
  const serverTimeDif = useSelector(serverTimeDifSelector);
  const users = useSelector(tableSelector);
  const ACTIVEROOMID = useSelector(activeRoomIdSelector);
  const [fetchTable, { isSuccess: tableSuccess, data }] =
    useLazyTotalScoreQuery();
  const [fetchNextMatches, { isSuccess: nmSuccess, isFetching }] =
    useLazyGetNextMatchesQuery();
  const [fetchTime, { isSuccess }] = useLazyGetNMTimeQuery();

  useEffect(() => {
    if (ACTIVEROOMID) {
      fetchTable({});
      fetchNextMatches({});
      fetchTime({});
    }
  }, [ACTIVEROOMID, fetchNextMatches, fetchTable, fetchTime]);

  useEffect(() => {
    if (tableSuccess && nmSuccess && isSuccess)
      dispatch(setIsPageLoading(false));
  }, [tableSuccess, nmSuccess, isSuccess, dispatch]);

  useEffect(() => {
    if (data && data.SUCCESS && data.DATA) {
      dispatch(setTable(data.DATA));
    }
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(setNMIsFetching(isFetching));
  }, [dispatch, isFetching]);

  const checkTime = () => {
    const difference = +new Date(NMtime) - (+new Date() - serverTimeDif);
    if (difference < 0 && NMtime) {
      fetchNextMatches({});
      fetchTime({});
      fetchTable({});
    }
  };

  useInterval(() => {
    checkTime();
  }, 1000);

  return (
    <section className={styles.page}>
      <Timer className={styles.timer} />
      <NextMatches />
      <Table users={users} title="TOP 3" moreStatistic top={3} />
    </section>
  );
};
