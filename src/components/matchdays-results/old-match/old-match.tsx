import { FC } from "react";
import { OldMatchInfo } from "../../../store/matchdays/matchdays.slice";
import styles from "./old-match.module.scss";
import { MatchInfoSection } from "../../next-matches/match-info-section/match-info-section";
import { OldFTSection } from "../old-ft-section/old-ft-section";
import { UserBet } from "../user-bet/user-bet";
import { useSelector } from "react-redux";
import { userNameSelector } from "../../../store/user/user.selector";

type Props = {
  matchInfo: OldMatchInfo;
};

export const OldMatch: FC<Props> = ({
  matchInfo: { INFO, TIME, TEAM1, TEAM2, WINNER, USERBETS },
}): JSX.Element => {
  const sortedBets = [...USERBETS].sort((a, b) => {
    if (a.SCORE[0] === "" && a.SCORE[1] === "") return 1;
    if (b.SCORE[0] === "" && b.SCORE[1] === "") return -1;
    return b.POINTS - a.POINTS;
  });

  const USERNAME = useSelector(userNameSelector);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <MatchInfoSection
          info={INFO}
          time={TIME}
          isSaved={TIME < Date.now().valueOf()}
          order={0}
        />
        <OldFTSection team1={TEAM1} team2={TEAM2} winner={WINNER} />
      </div>
      {TEAM1.SCORE !== "" &&
        [...sortedBets].map((bet) => (
          <UserBet
            bet={bet}
            key={bet.USERNAME}
            myBet={USERNAME === bet.USERNAME}
          />
        ))}
    </div>
  );
};
