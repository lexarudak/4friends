import styles from "./time-block.module.scss";

type Props = {
  name: string;
  time: number;
};

export const TimeBlock = ({ time, name }: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.time}>{time}</div>
      <div className={styles.name}>{name}</div>
    </div>
  );
};
