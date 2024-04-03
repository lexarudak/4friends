import { FC } from "react";
import { Team } from "../../../store/next-matches/next-matches.slice";
import styles from "./ft-section.module.scss";
import countries from "../../../const/countries";
import { ScoreInput } from "../score-input/score-input";

type Props = {
  team1: Team;
  team2: Team;
  order: number;
};

export const FTSection: FC<Props> = ({ team1, team2, order }): JSX.Element => {
  function getFlag(code: keyof typeof countries) {
    return code in countries ? countries[code] : "---";
  }

  return (
    <div className={styles.ftSection}>
      <span className={`fi fi-${getFlag(team1.code)}`} />
      <span className={styles.code}>{team1.code}</span>
      <ScoreInput name={`[${order}].team1.score`} />
      :
      <ScoreInput name={`[${order}].team2.score`} />
      <span className={styles.code}>{team2.code}</span>
      <span className={`fi fi-${getFlag(team2.code)}`} />
    </div>
  );
};
