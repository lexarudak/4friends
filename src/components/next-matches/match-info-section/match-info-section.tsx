import { FC } from "react";
import styles from "./match-info-section.module.scss";
import { getDate, getTime } from "../../../helpers";
import classNames from "classnames";
import { useFormikContext } from "formik";
import { ValidateErrors } from "../nm-form.tsx/validator";

type Props = {
  time: number;
  info: string;
  isSaved: boolean;
  order: number;
  handleErrors: boolean;
};

export const MatchInfoSection: FC<Props> = ({
  info,
  time,
  isSaved,
  order,
  handleErrors = true,
}): JSX.Element => {
  const { errors } = useFormikContext<ValidateErrors>();
  const emptyError = errors[`[${order}].score`];
  const winnerError = errors[`[${order}].winner`];

  const cn = {
    [styles.container]: true,
    [styles.saved]: isSaved,
    [styles.error]: (emptyError || winnerError) && handleErrors,
  };

  if (emptyError && handleErrors) {
    return (
      <div className={classNames(cn)}>
        <span>{emptyError}</span>
      </div>
    );
  }

  if (winnerError && handleErrors) {
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
