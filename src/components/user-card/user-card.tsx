import { FC } from "react";
import styles from "./user-card.module.scss";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { ROUTE_LIST } from "../../router/route-list";

type Props = {
  cn?: string;
  name: string;
  points: number;
  position: number | null;
  myCard?: boolean;
};

export const UserCard: FC<Props> = ({
  cn,
  name,
  points,
  position,
  myCard,
}): JSX.Element => {
  const { pathname } = useLocation();
  const mode = {
    [styles.card]: true,
    [styles.myCard]: myCard,
    [styles.winner]: position === 1,
    [styles.global]: pathname === ROUTE_LIST.top,
  };

  return (
    <div className={classNames(mode, cn)}>
      <div className={styles.firstItem} />
      {position && <span className={styles.item}>{position}</span>}
      <span className={styles.item}>{name}</span>
      <span className={styles.item}>{points}</span>
    </div>
  );
};

export const ShadowUserCard = (): JSX.Element => {
  return <div className={styles.shadowCard}>0</div>;
};
