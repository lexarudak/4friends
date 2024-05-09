import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import styles from "./handled-date-picker.module.scss";
import { FC } from "react";
import { Dayjs } from "dayjs";
import classNames from "classnames";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import { useLang } from "../../../lang/useLang";

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
  const {
    messages: { global },
    lang,
  } = useLang();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={lang}>
      <DatePicker
        format="DD/MM/YY"
        className={classNames(styles.picker, className)}
        value={value}
        onChange={onChange}
        maxDate={maxDate}
        minDate={minDate}
        localeText={{
          cancelButtonLabel: global.cancel,
          okButtonLabel: global.ok,
        }}
        slotProps={{
          toolbar: { hidden: true },
        }}
      />
    </LocalizationProvider>
  );
};
