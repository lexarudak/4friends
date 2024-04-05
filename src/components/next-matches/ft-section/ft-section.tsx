import { FC } from "react";
import { Team } from "../../../store/next-matches/next-matches.slice";
import styles from "./ft-section.module.scss";
import { ScoreInput } from "../score-input/score-input";
import { useBreakPoint } from "../../../hooks";
import { getFlag, getName } from "../../../helpers";
import classNames from "classnames";

type Props = {
  team1: Team;
  team2: Team;
  order: number;
};

export const FTSection: FC<Props> = ({ team1, team2, order }): JSX.Element => {
  const BP = useBreakPoint();

  return (
    <div className={styles.ftSection}>
      <div className={styles.half}>
        <span
          className={classNames(`fi fi-${getFlag(team1.code)}`, styles.flag)}
        />
        <span className={styles.code}>{getName(team1.code, BP)}</span>
        <ScoreInput name={`[${order}].team1.score`} />
      </div>
      <span className={styles.center}>:</span>
      <div className={styles.half}>
        <ScoreInput name={`[${order}].team2.score`} />
        <span className={styles.code}>{getName(team2.code, BP)}</span>
        <span
          className={classNames(`fi fi-${getFlag(team2.code)}`, styles.flag)}
        />
      </div>
    </div>
  );
};
