import styles from "./date-selector.module.scss";
import { BUTTON_COLOR, BUTTON_VARIANT, Button } from "../button/button";
import { useDispatch, useSelector } from "react-redux";
import { matchdaysDateSelector } from "../../store/matchdays/matchdays.selector";
import { HandledDatePicker } from "./handled-date-picker/handled-date-picker";
import dayjs, { Dayjs } from "dayjs";
import { setFrom, setTo } from "../../store/matchdays/matchdays.slice";
import { useEffect, useState } from "react";
import { validateDate } from "../../helpers";
import classNames from "classnames";

const text = "Select date range to show";
const errorText = `Pick date in range 01/04/24 - 31/08/24`;

export const DateSelector = (): JSX.Element => {
  const { from, to } = useSelector(matchdaysDateSelector);
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();
  const fromAccept = (e: Dayjs | null) => {
    dispatch(setFrom(e?.valueOf()));
  };
  const toAccept = (e: Dayjs | null) => {
    dispatch(setTo(e?.valueOf()));
  };

  const submit = () => {
    if (isValid) {
      console.log({ from, to });
    }
  };

  useEffect(() => {
    setIsValid(validateDate(from, to));
  }, [from, to]);

  const textStyle = {
    [styles.text]: true,
    [styles.error]: !isValid,
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.dateContainer}>
          <HandledDatePicker value={dayjs(from)} onChange={fromAccept} />
          -
          <HandledDatePicker value={dayjs(to)} onChange={toAccept} />
        </div>
        <p className={classNames(textStyle)}>{isValid ? text : errorText}</p>
        <Button
          color={BUTTON_COLOR.active}
          variant={BUTTON_VARIANT.fill}
          onClick={submit}
          disabled={!isValid}
        >
          Show
        </Button>
      </div>
    </>
  );
};
