import classNames from "classnames";
import styles from "./groups.module.scss";
import { getFlag, getName } from "../../../helpers";
import { useBreakPoint } from "../../../hooks";
import { useLang } from "../../../lang/useLang";
import { CountryKey } from "../../../store/next-matches/next-matches.slice";

export type GroupType = {
  group: string;
  info: {
    team: CountryKey;
    games: number;
    goals: number[];
    points: number;
  }[];
};

export const Group = ({ data }: { data: GroupType }): JSX.Element => {
  const BP = useBreakPoint();
  const { countries } = useLang();

  return (
    <li className={styles.li}>
      <h3>{data.group}</h3>
      <div className={styles.header}>
        <span>#</span>
        <span className={styles.groupItem}>g</span>
        <span className={styles.groupItem}>g</span>
        <span className={styles.groupItem}>p</span>
      </div>
      {data.info.map(({ team, games, goals: [goal1, goal2], points }, ind) => (
        <div className={styles.card}>
          <span className={styles.item}>{ind + 1}</span>
          <span
            className={classNames(
              `fi fi-${getFlag(team, countries)}`,
              styles.item,
            )}
          />
          <span className={styles.item}>{getName(team, countries, BP)}</span>
          <span className={styles.groupItem}>{games}</span>
          <span className={styles.groupItem}>
            {goal1}:{goal2}
          </span>
          <span className={styles.groupItem}>{points}</span>
        </div>
      ))}
    </li>
  );
};

export const Groups = ({ data }: { data: GroupType[] }): JSX.Element => {
  return (
    <ul className={styles.list}>
      {data.map((val) => (
        <Group data={val} />
      ))}
    </ul>
  );
};
