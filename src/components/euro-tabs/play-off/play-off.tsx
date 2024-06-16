import { FC } from "react";
import styles from "./play-off.module.scss";
import { CountryKey } from "../../../store/next-matches/next-matches.slice";
import { useBreakPoint } from "../../../hooks";
import { useLang } from "../../../lang/useLang";
import classNames from "classnames";
import { getFlag, getName } from "../../../helpers";

export type PlayOffMatch = {
  team: CountryKey;
  score: number | "-";
};

type Props = {
  data: PlayOffMatch[][];
};

type ItemProps = {
  data: PlayOffMatch[];
};

export const PlayOffItem: FC<ItemProps> = ({ data }): JSX.Element => {
  const BP = useBreakPoint();
  const { countries } = useLang();
  return (
    <li className={styles.li}>
      {data.map(({ team, score }) => (
        <div className={styles.card}>
          <span
            className={classNames(
              `fi fi-${getFlag(team, countries)}`,
              styles.item,
            )}
          />
          <span className={styles.item}>{getName(team, countries, BP)}</span>
          <span className={styles.score}>{score}</span>
        </div>
      ))}
    </li>
  );
};

export const PlayOff: FC<Props> = ({ data }): JSX.Element => {
  return (
    <ul className={styles.ul}>
      {data.map((val) => (
        <PlayOffItem data={val} />
      ))}
    </ul>
  );
};
