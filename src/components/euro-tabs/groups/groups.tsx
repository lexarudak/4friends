import classNames from "classnames";
import styles from "./groups.module.scss";
import {
  getCodeByName,
  getFlag,
  getName,
  translateInfo,
} from "../../../helpers";
import { useBreakPoint } from "../../../hooks";
import { useLang } from "../../../lang/useLang";
import { CountryKey } from "../../../store/next-matches/next-matches.slice";
import { Standings, StandingsDetails } from "../mock";
import { enCountries } from "../../../const/countries";

export type GroupType = {
  group: string;
  info: {
    team: CountryKey;
    games: number;
    goals: number[];
    points: number;
  }[];
};

export const Group = ({
  data,
  isGroup,
}: {
  data: StandingsDetails[];
  isGroup: boolean;
}): JSX.Element => {
  const BP = useBreakPoint();
  const { countries, lang } = useLang();

  const title = data[0].group;

  return (
    <li className={classNames(styles.li, { [styles.isGroup]: isGroup })}>
      <h3>{lang === "ru" ? translateInfo(title) : title}</h3>
      <div className={styles.header}>
        <span>#</span>
        <span className={styles.groupItem}>g</span>
        <span className={styles.groupItem}>g</span>
        <span className={styles.groupItem}>p</span>
      </div>
      {data.map(({ team, all: { goals, played }, points }, ind) => (
        <div className={styles.card} key={ind}>
          <div className={styles.firstItem} />
          <span className={styles.item}>{ind + 1}</span>
          <span
            className={classNames(
              `fi fi-${getFlag(getCodeByName(enCountries, team.name), countries)}`,
              styles.item,
            )}
          />
          <span className={styles.item}>
            {getName(getCodeByName(enCountries, team.name), countries, BP)}
          </span>
          <span className={styles.groupItem}>{played}</span>
          <span className={styles.groupItem}>
            {goals.for}:{goals.against}
          </span>
          <span className={styles.groupItem}>{points}</span>
        </div>
      ))}
    </li>
  );
};

export const Groups = ({ data }: { data: Standings }): JSX.Element => {
  return (
    <ul className={styles.list}>
      {data.map((val, key) => (
        <Group data={val} isGroup={val.length === 4} key={key} />
      ))}
    </ul>
  );
};
