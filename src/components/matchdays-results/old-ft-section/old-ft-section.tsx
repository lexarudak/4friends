import { FC } from "react";
import { Team } from "../../../store/next-matches/next-matches.slice";
import styles from "./old-ft-section.module.scss";
import { getFlag, getName } from "../../../helpers";
import { useBreakPoint } from "../../../hooks";

type Props = {
  team1: Team;
  team2: Team;
  winner: 0 | 1 | 2;
};

export const OldFTSection: FC<Props> = ({ team1, team2 }): JSX.Element => {
  const BP = useBreakPoint();

  return (
    <div className={styles.container}>
      <div className={styles.half}>
        <span className={`fi fi-${getFlag(team1.code)}`} />
        <span className={styles.code}>{getName(team1.code, BP)}</span>
      </div>
      <span className={styles.center}>:</span>
      <div className={styles.half}>
        <span className={styles.code}>{getName(team2.code, BP)}</span>
        <span className={`fi fi-${getFlag(team2.code)}`} />
      </div>
    </div>
  );
};
