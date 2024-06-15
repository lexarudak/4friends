import { useState } from "react";
import styles from "./euro-tabs.module.scss";
import { useLang } from "../../lang/useLang";
import { Tab } from "./tab/tab";

const content = [
  <div>Group</div>,
  <div>1/8</div>,
  <div>1/4</div>,
  <div>1/2</div>,
  <div>Final</div>,
];

export const EuroTabs = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);

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
