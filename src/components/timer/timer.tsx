import classNames from "classnames";
import styles from "./timer.module.scss";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { nextMatchSelector } from "../../store/app/app.selector";
import { TimeBlock } from "./time-block/time-block";

type Props = {
  className?: string;
};

export const Timer: FC<Props> = ({ className }): JSX.Element => {
  const nextMatch = useSelector(nextMatchSelector);
  const calculateTimeLeft = () => {
    const difference = +new Date(nextMatch) - +new Date();

    return difference > 0
      ? {
          Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          Minutes: Math.floor((difference / 1000 / 60) % 60),
          Seconds: Math.floor((difference / 1000) % 60),
        }
      : { Days: 0, Hours: 0, Minutes: 0, Seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className={classNames(styles.container, className)}>
      <h2 className={styles.title}>Countdown</h2>
      <div className={styles.timers}>
        {Object.entries(timeLeft).map(([name, time]) => (
          <TimeBlock name={name} time={time} key={name} />
        ))}
      </div>
    </div>
  );
};
