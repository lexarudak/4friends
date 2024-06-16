import { useEffect } from "react";
import { EuroTabs } from "../../components/euro-tabs/euro-tabs";
import styles from "./euro-page.module.scss";
import { useDispatch } from "react-redux";
import { setIsPageLoading } from "../../store/app/app.slice";
import { useGetStandingsQuery } from "../../store/api";
import { useLang } from "../../lang/useLang";
import { Loading } from "../../components/loading/loading";

const noResults = "No results";

export const EuroPage = (): JSX.Element => {
  const { data, isError, isFetching, isLoading } = useGetStandingsQuery({});
  const dispatch = useDispatch();
  const {
    messages: { global },
  } = useLang();

  useEffect(() => {
    dispatch(setIsPageLoading(false));
  }, [dispatch]);

  return (
    <section className={styles.page}>
      <h2>{global.euro}</h2>
      {(!data?.SUCCESS || !data.DATA || isError) && !isFetching ? (
        noResults
      ) : (
        <EuroTabs />
      )}
      <Loading loading={isLoading} />
    </section>
  );
};
