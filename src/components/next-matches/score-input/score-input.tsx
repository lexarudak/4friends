/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import styles from "./score-input.module.scss";
import { Field, useFormikContext } from "formik";

type Props = {
  name: string;
};

const MAX_VALUE = 99;
const MIN_VALUE = 0;
const symbols = [
  "+",
  "=",
  ":",
  ";",
  "'",
  "/",
  "",
  "|",
  "[",
  "]",
  "{",
  "}",
  "-",
];

export const ScoreInput: FC<Props> = ({ name }): JSX.Element => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (event: { target: { value: string; name: string } }) => {
    const value = parseInt(event.target.value);
    if (value > MAX_VALUE) {
      setFieldValue(event.target.name, Number(event.target.value.slice(0, 2)));
      return;
    }

    if (value < MIN_VALUE) {
      setFieldValue(event.target.name, MIN_VALUE);
      return;
    }

    if (event.target.value.length > 1 && event.target.value[0] === "0") {
      setFieldValue(event.target.name, MIN_VALUE);
      return;
    }

    const validValue =
      event.target.value === ""
        ? ""
        : Number(event.target.value.replace(/\D/g, ""));

    setFieldValue(event.target.name, validValue);
  };

  const handleKeyPress = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (symbols.includes(event.key)) {
      event.preventDefault();
    }
  };
  return (
    <Field
      name={name}
      type="number"
      className={styles.input}
      placeholder={"-"}
      min={MIN_VALUE}
      max={MAX_VALUE}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
};
