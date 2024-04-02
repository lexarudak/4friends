import { FC } from "react";
import styles from "./table.module.scss";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { tableSelector } from "../../store/statistic/statistic.selector";
import { UserCard } from "../user-card/user-card";

type Props = {
  cn?: string;
};

export const Table: FC<Props> = ({ cn }): JSX.Element => {
  const users = useSelector(tableSelector);

  return users.length ? (
    <section className={classNames(styles.container, cn)}>
      <h2 className={styles.title}>Table</h2>
      <ul className={styles.list}>
        {users.map(({ name, points }, ind) => (
          <UserCard name={name} points={points} key={ind} />
        ))}
      </ul>
    </section>
  ) : (
    <></>
  );
};
