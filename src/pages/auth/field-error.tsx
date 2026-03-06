import { FC } from "react";
import styles from "./auth.module.scss";
import classNames from "classnames";

type Props = {
  message?: string;
  className?: string;
};

export const FieldError: FC<Props> = ({ message, className }): JSX.Element => {
  if (message) {
    return <p className={classNames(styles.error, className)}>{message}</p>;
  }
  return <p className={styles.placeholder}>.</p>;
};
