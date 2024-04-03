import { FC } from "react";
import styles from "./match-info-section.module.scss";
import { getDate, getTime } from "../../../helpers";
import classNames from "classnames";

type Props = {
  time: number;
  info: string;
  isSaved: boolean;
};

export const MatchInfoSection: FC<Props> = ({
  info,
  time,
  isSaved,
}): JSX.Element => {
  const cn = { [styles.container]: true, [styles.saved]: isSaved };

  return (
    <div className={classNames(cn)}>
      <span className={styles.item}>{info}</span>
      <span className={styles.item}>{getTime(time)}</span>
      <span className={styles.item}>{getDate(time)}</span>
    </div>
  );
};
