import { Loading } from "./loading";
import styles from "./loading.module.scss";

export const FirstLoading = (): JSX.Element => {
  return (
    <div className={styles.firstLoading}>
      <h1>UEFA EURO 2024</h1>
      <Loading size={50} />
    </div>
  );
};
