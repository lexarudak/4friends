import { useState } from "react";
import styles from "./euro-tabs.module.scss";
import { useLang } from "../../lang/useLang";
import { Tab } from "./tab/tab";
import { mockResponse } from "./mock";
import { Groups } from "./groups/groups";
import { PlayOff } from "./play-off/play-off";

export const EuroTabs = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);
  const { groups, eight, final, four, two } = mockResponse;

  const content = [
    <Groups data={groups} />,
    <PlayOff data={eight} />,
    <PlayOff data={four} />,
    <PlayOff data={two} />,
    <PlayOff data={final} />,
  ];

  const {
    messages: { euro },
  } = useLang();

  const list = Object.values(euro);

  return (
    <div className={styles.container}>
      {list.map((name, index) => (
        <Tab
          onClickHandler={setActiveTab}
          index={index}
          name={name}
          activeTab={activeTab}
        />
      ))}
      <div className={styles.content}>{content[activeTab]}</div>
    </div>
  );
};
