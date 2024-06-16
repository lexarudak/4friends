import { useState } from "react";
import styles from "./euro-tabs.module.scss";
import { useLang } from "../../lang/useLang";
import { Tab } from "./tab/tab";
import { Groups } from "./groups/groups";
import { PlayOff } from "./play-off/play-off";
import { mockResponse } from "./mock";
import { useGetStandingsQuery } from "../../store/api";

export const EuroTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { eight, final, four, two } = mockResponse;
  const { data, isError } = useGetStandingsQuery({});
  const {
    messages: { euro },
  } = useLang();

  if (!data?.SUCCESS) {
    return null;
  }

  const standings = data.DATA.response[0].league.standings;

  const content = [
    <Groups data={standings} />,
    <PlayOff data={eight} />,
    <PlayOff data={four} />,
    <PlayOff data={two} />,
    <PlayOff data={final} />,
  ];

  const list = Object.values(euro);

  if (isError || !data) {
    return null;
  }

  return (
    <div className={styles.container}>
      {list.map((name, index) => (
        <Tab
          onClickHandler={setActiveTab}
          index={index}
          name={name}
          activeTab={activeTab}
          disabled={!!index}
        />
      ))}
      <div className={styles.content}>{content[activeTab]}</div>
    </div>
  );
};
