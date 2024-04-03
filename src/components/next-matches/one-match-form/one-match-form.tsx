import styles from "./one-match-form.module.scss";
import { NextMatch } from "../../../store/next-matches/next-matches.slice";
import { FC } from "react";
import { FTSection } from "../ft-section/ft-section";
import { MatchInfoSection } from "../match-info-section/match-info-section";
import { WinnerSection } from "../winner-section/winner-section";

type Props = {
  nm: NextMatch;
  order: number;
};

export const OneMatchForm: FC<Props> = ({
  nm: { team1, team2, time, info, isSaved, extra },
  order,
}): JSX.Element => {
  const isWinnerDisabled = () => {
    return team1.score === "" || team1.score !== team2.score;
  };

  return (
    <div className={styles.oneMatch}>
      <MatchInfoSection
        info={info}
        time={time}
        isSaved={isSaved}
        order={order}
      />
      <div className={styles.container}>
        <FTSection team1={team1} team2={team2} order={order} />
        {extra ? (
          <WinnerSection
            isDisabled={isWinnerDisabled()}
            name={`[${order}].winner`}
          />
        ) : null}
      </div>
    </div>
  );
};
