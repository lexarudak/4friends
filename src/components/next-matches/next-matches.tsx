import classNames from "classnames";
import styles from "./next-matches.module.scss";
import { FC } from "react";

type Props = {
  className?: string;
};

export const NextMatches: FC<Props> = ({ className }): JSX.Element => {
  return (
    <section className={classNames(styles.container, className)}></section>
  );
};
