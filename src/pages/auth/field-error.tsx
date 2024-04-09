import { FC } from "react";
import styles from "./auth.module.scss";

type Props = {
  message?: string;
};

export const FieldError: FC<Props> = ({ message }): JSX.Element => {
  if (message) {
    return <p className={styles.error}>{message}</p>;
  }
  return <p className={styles.placeholder}>.</p>;
};
