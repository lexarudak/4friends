import { FC } from "react";
import styles from "./user-card.module.scss";
import classNames from "classnames";

type Props = {
  cn?: string;
  name: string;
  points: number;
  position: number | null;
};

export const UserCard: FC<Props> = ({
  cn,
  name,
  points,
  position,
}): JSX.Element => {
  return (
    <div className={classNames(styles.card, cn)}>
      {position && <span className={styles.item}>{position}</span>}
      <span className={styles.item}>{name}</span>
      <span className={styles.item}>{points}</span>
    </div>
  );
};
