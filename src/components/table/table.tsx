import { FC } from "react";
import styles from "./table.module.scss";
import classNames from "classnames";
import { UserCard } from "../user-card/user-card";
import { UserPoints } from "../../store/statistic/statistic.slice";
import { Link } from "react-router-dom";
import { ROUTE_LIST } from "../../router/route-list";

type Props = {
  cn?: string;
  users: UserPoints[];
  usePositions?: boolean;
  title: string;
  moreStatistic?: boolean;
};

export const Table: FC<Props> = ({
  cn,
  users,
  usePositions,
  title,
  moreStatistic,
}): JSX.Element => {
  const sortedUsers = [...users].sort((a, b) => b.POINTS - a.POINTS);

  return users.length ? (
    <section className={classNames(styles.container, cn)}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {sortedUsers.map(({ USERNAME, POINTS }, ind) => (
          <UserCard
            name={USERNAME}
            points={POINTS}
            key={ind}
            position={usePositions ? ind + 1 : null}
          />
        ))}
      </ul>
      {moreStatistic && (
        <Link to={ROUTE_LIST.statistic} className={styles.link}>
          More statistic
        </Link>
      )}
    </section>
  ) : (
    <></>
  );
};
