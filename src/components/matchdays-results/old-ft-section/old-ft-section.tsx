import { FC } from "react";
import { Team } from "../../../store/next-matches/next-matches.slice";
import styles from "./old-ft-section.module.scss";
import { getFlag, getName } from "../../../helpers";
import { useBreakPoint } from "../../../hooks";
import classNames from "classnames";
import { useLang } from "../../../lang/useLang";
import {
  MatchStatus,
  STATUS_TYPE,
} from "../../../store/matchdays/matchdays.slice";

type Props = {
  team1: Team;
  team2: Team;
  winner: 0 | 1 | 2;
  status: MatchStatus;
};

export const OldFTSection: FC<Props> = ({
  team1,
  team2,
  winner,
  status,
}): JSX.Element => {
  const BP = useBreakPoint();
  const equalScore = team1.SCORE === team2.SCORE;
  const { countries } = useLang();

  return (
    <div className={styles.container}>
      <div className={styles.half}>
        <span
          className={classNames(
            `fi fi-${getFlag(team1.CODE, countries)}`,
            styles.flag,
          )}
        />
        <span
          className={classNames({
            [styles.code]: true,
            [styles.rp]: true,
          })}
        >
          {getName(team1.CODE, countries, BP)}
        </span>
      </div>
      <span
        className={classNames({
          [styles.score]: true,
          [styles.inProgress]: status.TYPE === STATUS_TYPE.inProgress,
          [styles.active]:
            winner === 1 && equalScore && status.TYPE === STATUS_TYPE.finished,
        })}
      >
        {status.TYPE === STATUS_TYPE.notStarted ? "-" : team1.SCORE}
      </span>
      <span
        className={classNames({
          [styles.center]: true,
          [styles.inProgress]: status.TYPE === STATUS_TYPE.inProgress,
        })}
      >
        :
      </span>
      <span
        className={classNames({
          [styles.score]: true,
          [styles.inProgress]: status.TYPE === STATUS_TYPE.inProgress,
          [styles.active]:
            winner === 2 && equalScore && status.TYPE === STATUS_TYPE.finished,
        })}
      >
        {status.TYPE === STATUS_TYPE.notStarted ? "-" : team2.SCORE}
      </span>
      <div className={styles.half}>
        <span
          className={classNames({
            [styles.code]: true,
            [styles.lp]: true,
          })}
        >
          {getName(team2.CODE, countries, BP)}
        </span>
        <span
          className={classNames(
            `fi fi-${getFlag(team2.CODE, countries)}`,
            styles.flag,
          )}
        />
      </div>
    </div>
  );
};
