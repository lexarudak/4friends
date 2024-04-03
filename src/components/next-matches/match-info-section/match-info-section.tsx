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
};

export const MatchInfoSection: FC<Props> = ({
  info,
  time,
  isSaved,
  order,
}): JSX.Element => {
  const { errors } = useFormikContext<ValidateErrors>();
  console.log(errors);
  const emptyError = errors[`[${order}].score`];
  const winnerError = errors[`[${order}].winner`];

  console.log({ winnerError, emptyError });
  const cn = {
    [styles.container]: true,
    [styles.saved]: isSaved,
    [styles.error]: emptyError || winnerError,
  };

  if (emptyError) {
    return (
      <div className={classNames(cn)}>
        <span>{emptyError}</span>
      </div>
    );
  }

  if (winnerError) {
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
