import { FC } from "react";
import styles from "./table.module.scss";
import classNames from "classnames";
import { UserPoints } from "../../store/statistic/statistic.slice";
import { Link } from "react-router-dom";
import { ROUTE_LIST } from "../../router/route-list";
import { usePaginationTable, useTop } from "./hooks";
import { useSelector } from "react-redux";
import { userNameSelector } from "../../store/user/user.selector";

type Props = {
  cn?: string;
  users: UserPoints[];
  title: string;
  moreStatistic?: boolean;
  top?: boolean;
  items: number;
  global?: boolean;
};

export const Table: FC<Props> = ({
  cn,
  users,
  title,
  moreStatistic,
  top,
  items,
  global,
}): JSX.Element => {
  const myName = useSelector(userNameSelector);
  const sortedUsers = [...users].sort((a, b) => {
    if (a.POINTS === b.POINTS) {
      if (a.USERNAME === myName) return -1;
      if (b.USERNAME === myName) return 1;
    }
    return b.POINTS - a.POINTS;
  });
  const topTable = useTop(sortedUsers, items);
  const paginationTable = usePaginationTable(sortedUsers, items);

  return users.length && items ? (
    <section
      className={classNames(styles.container, cn, global && styles.global)}
    >
      <h2 className={styles.title}>{title}</h2>
      {top ? topTable : paginationTable}
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
