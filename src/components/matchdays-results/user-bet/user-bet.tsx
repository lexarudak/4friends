import { FC } from "react";
import { UserBetInfo } from "../../../store/matchdays/matchdays.slice";
import styles from "./user-bet.module.scss";
import classNames from "classnames";

type Props = {
  bet: UserBetInfo;
};

export const UserBet: FC<Props> = ({
  bet: { name, score, winner, points },
}): JSX.Element => {
  return (
    <div className={styles.card}>
      <span
        className={classNames({
          [styles.score]: true,
          [styles.hide]: winner !== 1,
        })}
      >
        {"*"}
      </span>
      <span className={styles.score}>{score.length ? score[0] : "-"}</span>
      <span className={styles.score}>:</span>
      <span className={styles.score}>{score.length ? score[1] : "-"}</span>
      <span
        className={classNames({
          [styles.score]: true,
          [styles.hide]: winner !== 2,
        })}
      >
        {"*"}
      </span>
      <span className={styles.name}>{name}</span>
      <span className={styles.points}>{points}</span>
    </div>
  );
};
