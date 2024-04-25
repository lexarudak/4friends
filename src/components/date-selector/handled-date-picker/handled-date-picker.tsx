import { DatePicker } from "@mui/x-date-pickers";
import styles from "./handled-date-picker.module.scss";
import { FC } from "react";
import { Dayjs } from "dayjs";
import classNames from "classnames";

type Props = {
  value: Dayjs;
  onChange: (e: Dayjs | null) => void;
  className?: string;
  maxDate: Dayjs;
  minDate: Dayjs;
};

export const HandledDatePicker: FC<Props> = ({
  value,
  onChange,
  className,
  maxDate,
  minDate,
}): JSX.Element => {
  return (
    <DatePicker
      format="DD/MM/YY"
      className={classNames(styles.picker, className)}
      defaultValue={value}
      onChange={onChange}
      maxDate={maxDate}
      minDate={minDate}
    />
  );
};
