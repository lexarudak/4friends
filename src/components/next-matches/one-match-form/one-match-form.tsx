/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./one-match-form.module.scss";
import { NextMatch } from "../../../store/next-matches/next-matches.slice";
import { FC, useEffect, useState } from "react";
import { FTSection } from "../ft-section/ft-section";
import { MatchInfoSection } from "../match-info-section/match-info-section";
import { WinnerSection } from "../winner-section/winner-section";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { isNMLoadingSelector } from "../../../store/next-matches/next-matches.selector";

type Props = {
  nm: NextMatch;
  order: number;
  disabled?: boolean;
};

export const OneMatchForm: FC<Props> = ({
  nm: { TEAM1, TEAM2, TIME, INFO, SAVEDSCORE, EXTRA, WINNER },
  order,
}): JSX.Element => {
  const { SCORE: score1 } = TEAM1;
  const { SCORE: score2 } = TEAM2;
  const winnerName = `[${order}].WINNER`;
  const isSaved = SAVEDSCORE.join("") !== "0";
  const [isChanged, setIsChanged] = useState(false);
  const { setFieldValue, errors } = useFormikContext();
  const isFetching = useSelector(isNMLoadingSelector);
  const isWinnerDisabled = () =>
    score1 === "" || score1 !== score2 || isFetching;

  useEffect(() => {
    const getWinner = () => {
      if (score1 !== "" && score2 !== "") {
        if (score1 > score2) return 1;
        if (score1 < score2) return 2;
        return WINNER;
      }
      return 0;
    };

    setIsChanged([score1, score2, WINNER].join("") !== SAVEDSCORE.join(""));
    setFieldValue(winnerName, getWinner());
  }, [TEAM1, TEAM2, WINNER, SAVEDSCORE]);

  return (
    <div className={styles.oneMatch}>
      <MatchInfoSection
        info={INFO}
        time={TIME}
        isSaved={isSaved}
        isChanged={isChanged}
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
