import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../components/table/table";
import styles from "./top-page.module.scss";
import { statisticSelector } from "../../store/statistic/statistic.selector";
import { activeRoomIdSelector } from "../../store/user/user.selector";
import { useLazyTotalScoreQuery } from "../../store/api";
import { useEffect } from "react";
import { setGlobalTop } from "../../store/statistic/statistic.slice";
import { setIsPageLoading } from "../../store/app/app.slice";

export const TopPage = (): JSX.Element => {
  const { globalTop } = useSelector(statisticSelector);
  const dispatch = useDispatch();
  const ACTIVEROOMID = useSelector(activeRoomIdSelector);
  const [fetchTable, { data, isSuccess }] = useLazyTotalScoreQuery();

  useEffect(() => {
    if (ACTIVEROOMID) {
      fetchTable({});
      if (data && data.SUCCESS) {
        dispatch(setGlobalTop(data.DATA.TOPALL));
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
      <h2 className={styles.title}>
        Global Top
        <img src="/svg/crown.svg" alt="Crown Icon" width={40} height={40} />
      </h2>
      <Table users={globalTop} title="Top 3" top items={3} global />
      <Table users={globalTop} title="Total Score" items={10} global />
    </section>
  );
};
