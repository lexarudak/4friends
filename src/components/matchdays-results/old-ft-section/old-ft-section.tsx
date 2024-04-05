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

  return (
    <div className={styles.container}>
      <div className={styles.half}>
        <span
          className={classNames(`fi fi-${getFlag(team1.code)}`, styles.flag)}
        />
        <span
          className={classNames({
            [styles.code]: true,
            [styles.active1]: winner === 1,
          })}
        >
          {getName(team1.code, BP)}
        </span>
      </div>
      <span className={styles.score}>
        {team1.score === "" ? "-" : team1.score}
      </span>
      <span className={styles.center}>:</span>
      <span className={styles.score}>
        {team2.score === "" ? "-" : team2.score}
      </span>
      <div className={styles.half}>
        <span
          className={classNames({
            [styles.code]: true,
            [styles.active2]: winner === 2,
          })}
        >
          {getName(team2.code, BP)}
        </span>
        <span
          className={classNames(`fi fi-${getFlag(team2.code)}`, styles.flag)}
        />
      </div>
    </div>
  );
};
