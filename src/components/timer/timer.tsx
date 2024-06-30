import classNames from "classnames";
import styles from "./timer.module.scss";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  nextMatchSelector,
  serverTimeDifSelector,
} from "../../store/app/app.selector";
import { TimeBlock, TimeColor } from "./time-block/time-block";
import { useLang } from "../../lang/useLang";

type Props = {
  className?: string;
};

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
const ONE_HOUR_IN_MS = 60 * 60 * 1000;

export const Timer: FC<Props> = ({ className }): JSX.Element => {
  const nextMatch = useSelector(nextMatchSelector);
  const {
    messages: { timer },
  } = useLang();
  const serverTimeDif = useSelector(serverTimeDifSelector);
  const calculateTimeLeft = () => {
    const difference = +new Date(nextMatch) - (+new Date() - serverTimeDif);

    return difference > 0
      ? {
          info: {
            Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            Minutes: Math.floor((difference / 1000 / 60) % 60),
            Seconds: Math.floor((difference / 1000) % 60),
          },
          difference,
        }
      : { info: { Days: 0, Hours: 0, Minutes: 0, Seconds: 0 }, difference };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerId);
  }, [nextMatch]);

  const getColor = (dif: number) => {
    if (dif < FIVE_MINUTES_IN_MS) return TimeColor.red;
    if (dif < ONE_HOUR_IN_MS) return TimeColor.yellow;
    return TimeColor.white;
  };

  return (
    <div className={classNames(styles.container, className)}>
      <h2 className={styles.title}>{timer.countdown}</h2>
      <div className={styles.timers}>
        {Object.entries(timeLeft.info).map(([name, time], ind) => (
          <TimeBlock
            name={timer[name]}
            time={time}
            key={name}
            color={ind > 1 ? getColor(timeLeft.difference) : TimeColor.white}
          />
        ))}
      </div>
    </div>
  );
};
