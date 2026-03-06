import { FC } from "react";
import styles from "./play-off.module.scss";
import { CountryKey } from "../../../store/next-matches/next-matches.slice";
import { useBreakPoint } from "../../../hooks";
import { useLang } from "../../../lang/useLang";
import classNames from "classnames";
import { getDate, getFlag, getName, getTime } from "../../../helpers";
import { PlayoffMatchType } from "../mock";
import { STATUS_TYPE } from "../../../store/matchdays/matchdays.slice";

export type PlayOffMatch = {
  team: CountryKey;
  score: number | "-";
};

type Props = {
  data: PlayoffMatchType[];
};

type ItemProps = {
  data: PlayoffMatchType;
};

export const PlayOffItem: FC<ItemProps> = ({
  data: { TIME, WINNER, STATUS, TEAMS },
}): JSX.Element => {
  const BP = useBreakPoint();
  const { countries } = useLang();
  return (
    <li className={styles.li}>
      <p className={styles.time}>
        <span>{TIME ? getDate(TIME) : "--/--/--"}</span>
        <span>{TIME ? getTime(TIME) : "--:--"}</span>
      </p>
      {TEAMS.map(({ CODE, SCORE }, ind) => (
        <div
          className={classNames(styles.card, {
            [styles.winner]: WINNER === ind + 1,
          })}
          key={ind}
        >
          <span
            className={classNames(
              `fi fi-${getFlag(CODE, countries)}`,
              styles.item,
            )}
          />
          <span className={styles.item}>{getName(CODE, countries, BP)}</span>
          <span
            className={classNames(styles.score, {
              [styles.inProgress]: STATUS.TYPE === STATUS_TYPE.inProgress,
            })}
          >
            {STATUS.TYPE === STATUS_TYPE.notStarted ? "-" : SCORE}
          </span>
        </div>
      ))}
    </li>
  );
};

export const PlayOff: FC<Props> = ({ data }): JSX.Element => {
  return (
    <ul className={styles.ul}>
      {data.map((val, id) => (
        <PlayOffItem data={val} key={id} />
      ))}
    </ul>
  );
};
