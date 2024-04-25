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
  return (
    <div
      className={classNames(styles.card, {
        [styles.myBet]: myBet,
      })}
    >
      <span
        className={classNames(styles.score, {
          [styles.hide]: WINNER !== 1,
        })}
      >
        &#x2022;
      </span>
      <span className={classNames(styles.score, styles.num)}>
        {SCORE.length ? SCORE[0] : "-"}
      </span>
      <span className={styles.score}>:</span>
      <span className={classNames(styles.score, styles.num)}>
        {SCORE.length ? SCORE[1] : "-"}
      </span>
      <span
        className={classNames({
          [styles.score]: true,
          [styles.hide]: WINNER !== 2,
        })}
      >
        &#x2022;
      </span>
      <span className={styles.name}>{USERNAME}</span>
      <span className={styles.points}>{POINTS}</span>
    </div>
  );
};
