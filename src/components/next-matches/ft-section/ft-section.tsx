import { FC } from "react";
import { Team } from "../../../store/next-matches/next-matches.slice";
import styles from "./ft-section.module.scss";
import { ScoreInput } from "../score-input/score-input";
import { useBreakPoint } from "../../../hooks";
import { getFlag, getName } from "../../../helpers";
import classNames from "classnames";
import { isNMLoadingSelector } from "../../../store/next-matches/next-matches.selector";
import { useSelector } from "react-redux";

type Props = {
  team1: Team;
  team2: Team;
  order: number;
};

export const FTSection: FC<Props> = ({ team1, team2, order }): JSX.Element => {
  const BP = useBreakPoint();
  const isFetching = useSelector(isNMLoadingSelector);

  return (
    <div className={styles.ftSection}>
      <div className={styles.half}>
        <span
          className={classNames(`fi fi-${getFlag(team1.CODE)}`, styles.flag)}
        />
        <span className={styles.code}>{getName(team1.CODE, BP)}</span>
        <ScoreInput name={`[${order}].TEAM1.SCORE`} disabled={isFetching} />
      </div>
      <span className={styles.center}>:</span>
      <div className={styles.half}>
        <ScoreInput name={`[${order}].TEAM2.SCORE`} disabled={isFetching} />
        <span className={styles.code}>{getName(team2.CODE, BP)}</span>
        <span
          className={classNames(`fi fi-${getFlag(team2.CODE)}`, styles.flag)}
        />
      </div>
    </div>
  );
};
