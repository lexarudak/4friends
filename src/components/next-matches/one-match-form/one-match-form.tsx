/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./one-match-form.module.scss";
import { NextMatch } from "../../../store/next-matches/next-matches.slice";
import { FC, useEffect, useState } from "react";
import { FTSection } from "../ft-section/ft-section";
import { MatchInfoSection } from "../match-info-section/match-info-section";
import { WinnerSection } from "../winner-section/winner-section";
import { useFormikContext } from "formik";

type Props = {
  nm: NextMatch;
  order: number;
};

export const OneMatchForm: FC<Props> = ({
  nm: { team1, team2, time, info, savedScore, extra },
  order,
}): JSX.Element => {
  const { score: score1 } = team1;
  const { score: score2 } = team2;
  const winnerName = `[${order}].winner`;
  const [isSaved, setIsSaved] = useState(!!savedScore.length);
  const { setFieldValue, errors } = useFormikContext();
  const isWinnerDisabled = () => score1 === "" || score1 !== score2;

  useEffect(() => {
    const getWinner = () => {
      if (extra && score1 !== "" && score2 !== "") {
        if (score1 > score2) return 1;
        if (score1 < score2) return 2;
        return 0;
      }
      return 0;
    };

    setIsSaved(score1 === savedScore[0] && score2 === savedScore[1]);
    setFieldValue(winnerName, getWinner());
  }, [team1, team2]);

  return (
    <div className={styles.oneMatch}>
      <MatchInfoSection
        info={info}
        time={time}
        isSaved={isSaved}
        order={order}
        errors={errors}
      />
      <div className={styles.container}>
        <FTSection team1={team1} team2={team2} order={order} />
        {extra ? (
          <WinnerSection isDisabled={isWinnerDisabled()} name={winnerName} />
        ) : null}
      </div>
    </div>
  );
};
