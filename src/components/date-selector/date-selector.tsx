import styles from "./date-selector.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { matchdaysDateSelector } from "../../store/matchdays/matchdays.selector";
import { HandledDatePicker } from "./handled-date-picker/handled-date-picker";
import dayjs, { Dayjs } from "dayjs";
import { setFrom, setTo } from "../../store/matchdays/matchdays.slice";
import { useEffect, useState } from "react";
import { validateDate } from "../../helpers";
import classNames from "classnames";
import { MAX_DATE, MIN_DATE } from "../../const/const";
import { useLang } from "../../lang/useLang";

export const DateSelector = (): JSX.Element => {
  const { from, to } = useSelector(matchdaysDateSelector);
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();
  const {
    messages: { md },
  } = useLang();

  const fromChange = (e: Dayjs | null) => {
    dispatch(setFrom(e?.format("YYYY-MM-DD HH:mm:ss")));
  };

  const toChange = (e: Dayjs | null) => {
    dispatch(setTo(e?.format("YYYY-MM-DD HH:mm:ss")));
  };

  useEffect(() => {
    const isValid = validateDate(from, to);
    setIsValid(isValid);
  }, [from, to]);

  const textStyle = {
    [styles.text]: true,
    [styles.error]: !isValid,
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.dateContainer}>
          <HandledDatePicker
            value={dayjs(from)}
            onChange={fromChange}
            minDate={dayjs(MIN_DATE)}
            maxDate={dayjs(to)}
          />
          -
          <HandledDatePicker
            value={dayjs(to)}
            onChange={toChange}
            minDate={dayjs(from)}
            maxDate={dayjs(MAX_DATE)}
          />
        </div>
        <p className={classNames(textStyle)}>
          {isValid ? md.selectText : md.error}
        </p>
      </div>
    </>
  );
};
