import { FC } from "react";
import styles from "./user-card.module.scss";
import classNames from "classnames";

type Props = {
  cn?: string;
  name: string;
  points: number;
};

export const UserCard: FC<Props> = ({ cn, name, points }): JSX.Element => {
  return (
    <div className={classNames(styles.card, cn)}>
      <span className={styles.item}>{name}</span>
      <span className={styles.item}>{points}</span>
    </div>
  );
};
