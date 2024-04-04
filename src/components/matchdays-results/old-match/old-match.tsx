import { FC } from "react";
import { OldMatchInfo } from "../../../store/matchdays/matchdays.slice";
import styles from "./old-match.module.scss";

type Props = {
  matchInfo: OldMatchInfo;
};

export const OldMatch: FC<Props> = ({ matchInfo: {} }): JSX.Element => {
  return <div className={styles.container}></div>;
};
