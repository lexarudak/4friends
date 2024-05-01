import { FC } from "react";
import styles from "./user-card.module.scss";
import classNames from "classnames";

type Props = {
  cn?: string;
  name: string;
  points: number;
  position: number | null;
  myCard?: boolean;
};

export const UserCard: FC<Props> = ({
  cn,
  name,
  points,
  position,
  myCard,
}): JSX.Element => {
  const mode = {
    [styles.card]: true,
    [styles.myCard]: myCard,
    [styles.winner]: position === 1,
  };

  console.log({ points });

  return (
    <div className={classNames(mode, cn)}>
      {<div className={styles.firstItem} />}
      {position && <span className={styles.item}>{position}</span>}
      <span className={styles.item}>{name}</span>
      <span className={styles.item}>{points}</span>
    </div>
  );
};
