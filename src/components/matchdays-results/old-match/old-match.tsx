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
  matchInfo: { info, time, team1, team2, winner, usersBets },
}): JSX.Element => {
  const sortedBets = [...usersBets].sort((a, b) => {
    if (b.points && a.points) return b.points - a.points;
    return 1;
  });
  const USERNAME = useSelector(userNameSelector);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <MatchInfoSection
          info={info}
          time={time}
          isSaved={time < Date.now().valueOf()}
          order={0}
        />
        <OldFTSection team1={team1} team2={team2} winner={winner} />
      </div>
      {team1.SCORE !== "" &&
        sortedBets.map((bet) => (
          <UserBet bet={bet} key={bet.name} myBet={USERNAME === bet.name} />
        ))}
    </div>
  );
};
