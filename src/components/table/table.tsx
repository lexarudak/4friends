import { FC, useRef } from "react";
import styles from "./table.module.scss";
import classNames from "classnames";
import { UserCard } from "../user-card/user-card";
import { UserPoints } from "../../store/statistic/statistic.slice";
import { Link } from "react-router-dom";
import { ROUTE_LIST } from "../../router/route-list";
import { useSelector } from "react-redux";
import { userNameSelector } from "../../store/user/user.selector";

type Props = {
  cn?: string;
  users: UserPoints[];
  title: string;
  moreStatistic?: boolean;
  top?: number;
};

export const Table: FC<Props> = ({
  cn,
  users,
  title,
  moreStatistic,
  top,
}): JSX.Element => {
  const sortedUsers = [...users].sort((a, b) => b.POINTS - a.POINTS);
  const myUsername = useSelector(userNameSelector);
  const currentPosition = useRef(0);
  const getPosition = (ind: number, arr: UserPoints[]) => {
    if (!ind) {
      currentPosition.current = 1;
      return 1;
    }
    if (arr[ind - 1].POINTS === arr[ind].POINTS) {
      return currentPosition.current;
    }
    currentPosition.current = ind + 1;
    return ind + 1;
  };

  const getTop = (top: number) => {
    const topList = sortedUsers.map(({ USERNAME, POINTS }, ind, arr) => {
      if (ind < top) {
        return (
          <UserCard
            name={USERNAME}
            points={POINTS}
            key={ind}
            position={getPosition(ind, arr)}
            myCard={myUsername === USERNAME}
          />
        );
      }
      if (myUsername === USERNAME) {
        return (
          <>
            <div className={styles.dots}>...</div>
            <UserCard
              name={USERNAME}
              points={POINTS}
              key={ind}
              position={getPosition(ind, arr)}
              myCard={myUsername === USERNAME}
            />
          </>
        );
      }
      return null;
    });
    return topList;
  };

  return users.length ? (
    <section className={classNames(styles.container, cn)}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {top
          ? getTop(top)
          : sortedUsers.map(({ USERNAME, POINTS }, ind, arr) => (
              <UserCard
                name={USERNAME}
                points={POINTS}
                key={ind}
                position={getPosition(ind, arr)}
                myCard={myUsername === USERNAME}
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
