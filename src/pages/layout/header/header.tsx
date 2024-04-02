import { Burger } from "./burger/burger";
import styles from "./header.module.scss";

export const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <Burger />
    </header>
  );
};
