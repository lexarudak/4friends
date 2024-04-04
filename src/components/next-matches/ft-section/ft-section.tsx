import { FC } from "react";
import { Team } from "../../../store/next-matches/next-matches.slice";
import styles from "./ft-section.module.scss";
import countries from "../../../const/countries";
import { ScoreInput } from "../score-input/score-input";
import { BREAKPOINTS, useBreakPoint } from "../../../hooks";

type Props = {
  team1: Team;
  team2: Team;
  order: number;
};

export const FTSection: FC<Props> = ({ team1, team2, order }): JSX.Element => {
  const BP = useBreakPoint();

  const getFlag = (code: keyof typeof countries) =>
    code in countries ? countries[code].code2 : "---";

  const getName = (code: keyof typeof countries) =>
    code in countries
      ? BP === BREAKPOINTS.xl
        ? countries[code].name
        : code
      : code;

  return (
    <div className={styles.ftSection}>
      <div className={styles.half}>
        <span className={`fi fi-${getFlag(team1.code)}`} />
        <span className={styles.code}>{getName(team1.code)}</span>
        <ScoreInput name={`[${order}].team1.score`} />
      </div>
      <span className={styles.center}>:</span>
      <div className={styles.half}>
        <ScoreInput name={`[${order}].team2.score`} />
        <span className={styles.code}>{getName(team2.code)}</span>
        <span className={`fi fi-${getFlag(team2.code)}`} />
      </div>
    </div>
  );
};
