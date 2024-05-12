import { FC, ReactNode } from "react";
import styles from "../rules-page.module.scss";

type Props = {
  title?: string;
  children: ReactNode;
  id?: string;
};

export const RulesBlock: FC<Props> = ({ title, children, id }): JSX.Element => {
  return (
    <div className={styles.block} id={id}>
      {title && <h3 className={styles.blockTitle}>{title}</h3>}
      {children}
    </div>
  );
};
