import { FC } from "react";
import { UserBetInfo } from "../../../store/matchdays/matchdays.slice";
import styles from "./user-bet.module.scss";
import classNames from "classnames";

type Props = {
  bet: UserBetInfo;
  myBet?: boolean;
};

export const UserBet: FC<Props> = ({
  bet: { USERNAME, SCORE, WINNER, POINTS },
  myBet,
}): JSX.Element => {
  const equalScore = SCORE[0] === SCORE[1];

  return (
    <div
      className={classNames(styles.card, {
        [styles.myBet]: myBet,
      })}
    >
      <span
        className={classNames({
          [styles.score]: true,
          [styles.num]: true,
          [styles.active]: WINNER === 1 && equalScore,
        })}
      >
        {SCORE[0] !== "" ? SCORE[0] : "-"}
      </span>
      <span className={styles.score}>:</span>
      <span
        className={classNames({
          [styles.score]: true,
          [styles.num]: true,
          [styles.active]: WINNER === 2 && equalScore,
        })}
      >
        {SCORE[1] !== "" ? SCORE[1] : "-"}
      </span>
      <span className={styles.name}>{USERNAME}</span>
      <span className={styles.points}>{POINTS || 0}</span>
    </div>
  );
};
