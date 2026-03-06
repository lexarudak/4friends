import { FC } from "react";
import styles from "./winner-section.module.scss";
import { useField, useFormikContext } from "formik";
import classNames from "classnames";
import { useLang } from "../../../lang/useLang";

type Props = {
  isDisabled: boolean;
  name: string;
};

export const WinnerSection: FC<Props> = ({ isDisabled, name }): JSX.Element => {
  const { setFieldValue } = useFormikContext();
  const { messages } = useLang();
  const [{ value }] = useField(name);
  const onClickHandler = (winner: 1 | 2) => {
    setFieldValue(name, winner);
  };

  return (
    <fieldset disabled={isDisabled} className={styles.fieldset}>
      <button
        type="button"
        onClick={() => onClickHandler(1)}
        className={classNames({
          [styles.button]: true,
          [styles.active]: value === 1,
        })}
      />
      <span>{messages.global.win}</span>
      <button
        type="button"
        onClick={() => onClickHandler(2)}
        className={classNames({
          [styles.button]: true,
          [styles.active]: value === 2,
        })}
      />
    </fieldset>
  );
};
