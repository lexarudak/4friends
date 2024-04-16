/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./one-match-form.module.scss";
import { NextMatch } from "../../../store/next-matches/next-matches.slice";
import { FC, useEffect, useState } from "react";
import { FTSection } from "../ft-section/ft-section";
import { MatchInfoSection } from "../match-info-section/match-info-section";
import { WinnerSection } from "../winner-section/winner-section";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { isNMFetchingSelector } from "../../../store/next-matches/next-matches.selector";

type Props = {
  nm: NextMatch;
  order: number;
  disabled?: boolean;
};

export const OneMatchForm: FC<Props> = ({
  nm: { TEAM1, TEAM2, TIME, INFO, SAVEDSCORE, EXTRA },
  order,
}): JSX.Element => {
  const { SCORE: score1 } = TEAM1;
  const { SCORE: score2 } = TEAM2;
  const winnerName = `[${order}].WINNER`;
  const [isSaved, setIsSaved] = useState(!!SAVEDSCORE.length);
  const { setFieldValue, errors } = useFormikContext();
  const isFetching = useSelector(isNMFetchingSelector);
  const isWinnerDisabled = () =>
    score1 === "" || score1 !== score2 || isFetching;

  useEffect(() => {
    const getWinner = () => {
      if (EXTRA && score1 !== "" && score2 !== "") {
        if (score1 > score2) return 1;
        if (score1 < score2) return 2;
        return 0;
      }
      return 0;
    };

    setIsSaved(score1 === SAVEDSCORE[0] && score2 === SAVEDSCORE[1]);
    setFieldValue(winnerName, getWinner());
  }, [TEAM1, TEAM2]);

  return (
    <div className={styles.oneMatch}>
      <MatchInfoSection
        info={INFO}
        time={TIME}
        isSaved={isSaved}
        order={order}
        errors={errors}
      />
      <div className={styles.container}>
        <FTSection team1={TEAM1} team2={TEAM2} order={order} />
        {EXTRA ? (
          <WinnerSection isDisabled={isWinnerDisabled()} name={winnerName} />
        ) : null}
      </div>
    </div>
  );
};
