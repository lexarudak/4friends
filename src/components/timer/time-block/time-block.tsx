import classNames from "classnames";
import styles from "./time-block.module.scss";

export enum TimeColor {
  yellow = "yellow",
  red = "red",
  white = "white",
}

type Props = {
  name: string;
  time: number;
  color: TimeColor;
};

export const TimeBlock = ({ time, name, color }: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={classNames({ [styles[color]]: true })}>{time}</div>
      <div className={styles.name}>{name}</div>
    </div>
  );
};
