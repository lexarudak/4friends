import { FC } from "react";
import styles from "./match-info-section.module.scss";
import { getDate, getTime } from "../../../helpers";
import classNames from "classnames";
import { FormikErrors } from "formik";
import { ValidateErrors } from "../nm-form.tsx/validator";

type Props = {
  time: number;
  info: string;
  isSaved: boolean;
  isChanged?: boolean;
  order: number;
  errors?: FormikErrors<ValidateErrors>;
};

export const MatchInfoSection: FC<Props> = ({
  info,
  time,
  isSaved,
  isChanged,
  order,
  errors,
}): JSX.Element => {
  const emptyError = errors?.[`[${order}].SCORE`];
  const winnerError = errors?.[`[${order}].WINNER`];

  const cn = {
    [styles.container]: true,
    [styles.saved]: isSaved && !isChanged,
    [styles.changed]: isChanged,
    [styles.error]: (emptyError || winnerError) && errors,
  };

  if (emptyError && errors) {
    return (
      <div className={classNames(cn)}>
        <span>{emptyError}</span>
      </div>
    );
  }

  if (winnerError && errors) {
    return (
      <div className={classNames(cn)}>
        <span>{winnerError}</span>
      </div>
    );
  }

  return (
    <div className={classNames(cn)}>
      <span className={styles.item}>{info}</span>
      <span className={styles.item}>{getTime(time)}</span>
      <span className={styles.item}>{getDate(time)}</span>
    </div>
  );
};
