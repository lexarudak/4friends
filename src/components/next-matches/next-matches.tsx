import classNames from "classnames";
import styles from "./next-matches.module.scss";
import { FC } from "react";
import { NMForm } from "./nm-form.tsx/nm-form";
import { Loading } from "../loading/loading";
import { useSelector } from "react-redux";
import { isNMFetchingSelector } from "../../store/next-matches/next-matches.selector";

type Props = {
  className?: string;
};

export const NextMatches: FC<Props> = ({ className }): JSX.Element => {
  const isFetching = useSelector(isNMFetchingSelector);

  return (
    <section className={classNames(styles.container, className)}>
      <h2 className={styles.title}>
        Next matches <Loading loading={isFetching} />
      </h2>
      <NMForm />
    </section>
  );
};
