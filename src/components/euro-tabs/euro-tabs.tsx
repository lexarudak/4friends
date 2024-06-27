import { useEffect, useState } from "react";
import styles from "./euro-tabs.module.scss";
import { useLang } from "../../lang/useLang";
import { Tab } from "./tab/tab";
import { Groups } from "./groups/groups";
import { PlayOff } from "./play-off/play-off";
import { GROUPS, PlayoffMatchType, mockPlayoffMatch } from "./mock";
import { useLazyGetMatchdaysQuery } from "../../store/api";
import { matchdaysDateSelector } from "../../store/matchdays/matchdays.selector";
import { useSelector } from "react-redux";
import { activeRoomIdSelector } from "../../store/user/user.selector";

enum Round {
  eight = "1/8",
  four = "1/4",
  second = "1/2",
  final = "Final",
}

export const EuroTabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { from, to } = useSelector(matchdaysDateSelector);
  const ACTIVEROOMID = useSelector(activeRoomIdSelector);
  const [fetch, { data }] = useLazyGetMatchdaysQuery();

  useEffect(() => {
    const updateInfo = () => {
      fetch({ from, to });
    };
    updateInfo();

    const interval = setInterval(updateInfo, 120000);

    return () => {
      clearInterval(interval);
    };
  }, [fetch, from, to, ACTIVEROOMID]);

  const {
    messages: { euro },
  } = useLang();

  const standings = GROUPS.response[0].league.standings;

  const getMatchesArray = (length: number, round: Round) => {
    const arr: PlayoffMatchType[] = new Array(length).fill(mockPlayoffMatch);
    if (!data?.SUCCESS) {
      return arr;
    }

    const matches = data.DATA.filter(({ INFO }) => INFO === round)
      .sort((a, b) => a.TIME - b.TIME)
      .map(({ TIME, WINNER, TEAM1, TEAM2, STATUS }) => ({
        TIME,
        WINNER,
        STATUS,
        TEAMS: [TEAM1, TEAM2],
      }));

    return arr.map((val, ind) => matches[ind] || val);
  };

  const content = [
    <Groups data={standings} />,
    <PlayOff data={getMatchesArray(8, Round.eight)} />,
    <PlayOff data={getMatchesArray(4, Round.four)} />,
    <PlayOff data={getMatchesArray(2, Round.second)} />,
    <PlayOff data={getMatchesArray(1, Round.final)} />,
  ];

  const list = Object.values(euro);

  return (
    <div className={styles.container}>
      {list.map((name, index) => (
        <Tab
          onClickHandler={setActiveTab}
          index={index}
          name={name}
          activeTab={activeTab}
          key={index}
        />
      ))}
      <div className={styles.content}>{content[activeTab]}</div>
    </div>
  );
};
