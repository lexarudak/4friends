import { FC } from "react";
import styles from "./match-info-section.module.scss";
import { getDate, getTime } from "../../../helpers";
import classNames from "classnames";
import { FormikErrors } from "formik";
import { ValidateErrors } from "../nm-form.tsx/validator";
import { useLang } from "../../../lang/useLang";
import {
  MatchStatus,
  STATUS_TYPE,
} from "../../../store/matchdays/matchdays.slice";
import { useStatusText } from "../../../hooks";

type Props = {
  time: number;
  info: string;
  isSaved: boolean;
  inProgress?: boolean;
  order: number;
  errors?: FormikErrors<ValidateErrors>;
  matchStatus?: MatchStatus;
};

export const MatchInfoSection: FC<Props> = ({
  info,
  time,
  isSaved,
  inProgress,
  order,
  errors,
  matchStatus,
}): JSX.Element => {
  const emptyError = errors?.[`[${order}].SCORE`];
  const winnerError = errors?.[`[${order}].WINNER`];
  const { lang } = useLang();
  const statusText = useStatusText(matchStatus);

  const cn = {
    [styles.container]: true,
    [styles.saved]: isSaved && !inProgress,
    [styles.changed]: inProgress,
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

  const translateInfo = (info: string) =>
    info.replace(/Final/g, "Финал").replace(/Group/g, "Группа");

  return (
    <div className={classNames(cn)}>
      <span className={styles.item}>
        {lang === "ru" ? translateInfo(info) : info}
      </span>
      <span className={styles.item}>
        {statusText && matchStatus?.TYPE === STATUS_TYPE.inProgress
          ? statusText
          : getTime(time)}
      </span>
      <span className={styles.item}>{getDate(time)}</span>
    </div>
  );
};
