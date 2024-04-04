import { DatePicker } from "@mui/x-date-pickers";
import styles from "./handled-date-picker.module.scss";
import { FC } from "react";
import dayjs, { Dayjs } from "dayjs";
import classNames from "classnames";
import { MAX_DATE, MIN_DATE } from "../../../const/const";

type Props = {
  value: Dayjs;
  onChange: (e: Dayjs | null) => void;
  className?: string;
};

export const HandledDatePicker: FC<Props> = ({
  value,
  onChange,
  className,
}): JSX.Element => {
  return (
    <DatePicker
      format="DD/MM/YY"
      className={classNames(styles.picker, className)}
      defaultValue={value}
      onChange={onChange}
      maxDate={dayjs(MAX_DATE)}
      minDate={dayjs(MIN_DATE)}
    />
  );
};
