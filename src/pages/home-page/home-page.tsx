import { Timer } from "../../components/timer/timer";
import styles from "./home-page.module.scss";

export const HomePage = (): JSX.Element => {
  return (
    <section className={styles.page}>
      <Timer className={styles.timer} />
    </section>
  );
};
