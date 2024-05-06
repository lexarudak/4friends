import { FC } from "react";
import { Team } from "../../../store/next-matches/next-matches.slice";
import styles from "./old-ft-section.module.scss";
import { getFlag, getName } from "../../../helpers";
import { useBreakPoint } from "../../../hooks";
import classNames from "classnames";

type Props = {
  team1: Team;
  team2: Team;
  winner: 0 | 1 | 2;
};

export const OldFTSection: FC<Props> = ({
  team1,
  team2,
  winner,
}): JSX.Element => {
  const BP = useBreakPoint();
  const equalScore = team1.SCORE === team2.SCORE;

  return (
    <div className={styles.container}>
      <div className={styles.half}>
        <span
          className={classNames(`fi fi-${getFlag(team1.CODE)}`, styles.flag)}
        />
        <span
          className={classNames({
            [styles.code]: true,
            [styles.rp]: true,
          })}
        >
          {getName(team1.CODE, BP)}
        </span>
      </div>
      <span
        className={classNames({
          [styles.score]: true,
          [styles.active]: winner === 1 && equalScore,
        })}
      >
        {team1.SCORE === "" ? "-" : team1.SCORE}
      </span>
      <span className={styles.center}>:</span>
      <span
        className={classNames({
          [styles.score]: true,
          [styles.active]: winner === 2 && equalScore,
        })}
      >
        {team2.SCORE === "" ? "-" : team2.SCORE}
      </span>
      <div className={styles.half}>
        <span
          className={classNames({
            [styles.code]: true,
            [styles.lp]: true,
          })}
        >
          {getName(team2.CODE, BP)}
        </span>
        <span
          className={classNames(`fi fi-${getFlag(team2.CODE)}`, styles.flag)}
        />
      </div>
    </div>
  );
};
