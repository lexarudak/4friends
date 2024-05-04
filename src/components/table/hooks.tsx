import { useRef, useState } from "react";
import { UserPoints } from "../../store/statistic/statistic.slice";
import { ShadowUserCard, UserCard } from "../user-card/user-card";
import { useSelector } from "react-redux";
import { userNameSelector } from "../../store/user/user.selector";
import styles from "./table.module.scss";
import { Pagination } from "@mui/material";

export const usePosition = () => {
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

  return getPosition;
};

export const useTop = (sortedUsers: UserPoints[], items: number) => {
  const getPosition = usePosition();
  const myUsername = useSelector(userNameSelector);

  const topTable = (
    <ul className={styles.list}>
      {sortedUsers.map(({ USERNAME, POINTS }, ind, arr) => {
        if (ind < items) {
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

        getPosition(ind, arr);
        return null;
      })}
    </ul>
  );

  return topTable;
};

export const usePaginationTable = (
  sortedUsers: UserPoints[],
  items: number,
) => {
  const allItemsAmount = sortedUsers.length;
  const pagesAmount = Math.ceil(allItemsAmount / items);
  const isPagination = allItemsAmount > items;
  const getPosition = usePosition();
  const myUsername = useSelector(userNameSelector);
  const usersWithPositions = sortedUsers.map((user, ind, arr) => ({
    ...user,
    position: getPosition(ind, arr),
  }));

  const [page, setPage] = useState(1);
  const onChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const getPage = () => {
    const res = [];

    let i = 0;
    while (i < items) {
      const card = usersWithPositions[i + (page - 1) * items];
      if (card) {
        const { USERNAME, POINTS, position } = card;
        res.push(
          <UserCard
            name={USERNAME}
            points={POINTS}
            key={i}
            position={position}
            myCard={myUsername === USERNAME}
          />,
        );
      } else if (isPagination) {
        res.push(<ShadowUserCard key={i} />);
      } else {
        break;
      }
      i++;
    }

    return res;
  };

  return (
    <div>
      <ul className={styles.list}>{...getPage()}</ul>
      {isPagination && (
        <Pagination
          count={pagesAmount}
          hideNextButton
          hidePrevButton
          color="standard"
          className={styles.pag}
          onChange={onChange}
        />
      )}
    </div>
  );
};
