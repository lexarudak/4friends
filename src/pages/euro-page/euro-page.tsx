import { useEffect } from "react";
import { EuroTabs } from "../../components/euro-tabs/euro-tabs";
import styles from "./euro-page.module.scss";
import { useDispatch } from "react-redux";
import { setIsPageLoading } from "../../store/app/app.slice";
import { useLang } from "../../lang/useLang";

export const EuroPage = (): JSX.Element => {
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
      <EuroTabs />
    </section>
  );
};
