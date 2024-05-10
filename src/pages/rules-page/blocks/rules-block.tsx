import { FC, ReactNode } from "react";
import styles from "../rules-page.module.scss";

type Props = {
  title: string;
  children: ReactNode;
};

export const RulesBlock: FC<Props> = ({ title, children }): JSX.Element => {
  return (
    <div className={styles.block}>
      <h3 className={styles.blockTitle}>{title}</h3>
      {children}
    </div>
  );
};
