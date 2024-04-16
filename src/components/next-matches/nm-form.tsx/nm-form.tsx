import { useSelector } from "react-redux";
import styles from "./nm-form.module.scss";
import { Formik, Form } from "formik";
import {
  isNMFetchingSelector,
  nextMatchesSelector,
} from "../../../store/next-matches/next-matches.selector";
import { NextMatch } from "../../../store/next-matches/next-matches.slice";
import { OneMatchForm } from "../one-match-form/one-match-form";
import { BUTTON_COLOR, BUTTON_VARIANT, Button } from "../../button/button";
import { validator } from "./validator";
import { FC, useState } from "react";
import classNames from "classnames";

type Props = {
  className?: string;
};

export const NMForm: FC<Props> = ({ className }): JSX.Element => {
  const nextMatches = useSelector(nextMatchesSelector);
  const [firstTry, setFirstTry] = useState(false);
  const isFetching = useSelector(isNMFetchingSelector);

  const submit = (values: NextMatch[]) => {
    console.log("submit", JSON.stringify(values, null, 2));
  };

  const onClick = (
    submitForm: (() => Promise<void>) & (() => Promise<unknown>),
  ) => {
    setFirstTry(true);
    submitForm();
  };
  return (
    <Formik
      initialValues={nextMatches}
      onSubmit={submit}
      validate={validator}
      validateOnBlur={false}
      validateOnChange={firstTry}
    >
      {({ values, dirty, isValid, submitForm }) => (
        <Form className={classNames(styles.form, className)}>
          {values.map((nm, ind) => (
            <OneMatchForm nm={nm} order={ind} key={nm.MATCHID} />
          ))}
          <Button
            variant={BUTTON_VARIANT.fill}
            color={BUTTON_COLOR.active}
            type="submit"
            onClick={() => onClick(submitForm)}
            className={styles.button}
            disabled={!dirty || !isValid || isFetching}
          >
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};
