import classNames from "classnames";
import styles from "./next-matches.module.scss";
import { FC } from "react";
import { NMForm } from "./nm-form.tsx/nm-form";

type Props = {
  className?: string;
};

export const NextMatches: FC<Props> = ({ className }): JSX.Element => {
  return (
    <section className={classNames(styles.container, className)}>
      <h2 className={styles.title}>Next matches</h2>
      <NMForm />
    </section>
  );
};
