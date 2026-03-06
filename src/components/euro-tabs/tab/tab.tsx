import { FC } from "react";
import styles from "./tab.module.scss";
import classNames from "classnames";

type Props = {
  name: string;
  index: number;
  activeTab: number;
  onClickHandler: (index: number) => void;
  disabled?: boolean;
};

export const Tab: FC<Props> = ({
  index,
  name,
  activeTab,
  onClickHandler,
  disabled,
}): JSX.Element => {
  return (
    <button
      disabled={disabled}
      className={classNames(styles.tab, {
        [styles.active]: activeTab === index,
      })}
      onClick={() => onClickHandler(index)}
    >
      {name}
    </button>
  );
};
