import { FC } from "react";
import {
  OldMatchInfo,
  STATUS_TYPE,
} from "../../../store/matchdays/matchdays.slice";
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
  matchInfo: { INFO, TIME, TEAM1, TEAM2, WINNER, USERBETS, STATUS },
}): JSX.Element => {
  const sortedBets = [...USERBETS].sort((a, b) => {
    if (a.SCORE[0] === "" && a.SCORE[1] === "") return 1;
    if (b.SCORE[0] === "" && b.SCORE[1] === "") return -1;
    return b.POINTS - a.POINTS;
  });

  const USERNAME = useSelector(userNameSelector);
  const matchStarted = STATUS.TYPE !== STATUS_TYPE.notStarted;

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <MatchInfoSection
          info={INFO}
          time={TIME}
          isSaved={STATUS.TYPE === STATUS_TYPE.finished}
          order={0}
          inProgress={STATUS.TYPE === STATUS_TYPE.inProgress}
        />
        <OldFTSection
          team1={TEAM1}
          team2={TEAM2}
          winner={WINNER}
          status={STATUS}
        />
      </div>
      {matchStarted &&
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
