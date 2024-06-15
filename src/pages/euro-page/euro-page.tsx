import { useEffect } from "react";
import { EuroTabs } from "../../components/euro-tabs/euro-tabs";
import styles from "./euro-page.module.scss";
import { useDispatch } from "react-redux";
import { setIsPageLoading } from "../../store/app/app.slice";

export const EuroPage = (): JSX.Element => {
  const isSuccess = true;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setIsPageLoading(false));
    }
  }, [dispatch, isSuccess]);

  return (
    <section className={styles.page}>
      <h2>EURO 2024</h2>
      <EuroTabs />
    </section>
  );
};
