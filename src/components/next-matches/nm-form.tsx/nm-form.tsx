import { useSelector } from "react-redux";
import styles from "./nm-form.module.scss";
import { Formik, Form } from "formik";
import { nextMatchesSelector } from "../../../store/next-matches/next-matches.selector";
import { NextMatch } from "../../../store/next-matches/next-matches.slice";
import { OneMatchForm } from "../one-match-form/one-match-form";
import { BUTTON_COLOR, BUTTON_VARIANT, Button } from "../../button/button";
import { validator } from "./validator";
import { useState } from "react";
import { isScoreSaved } from "../../../helpers";

export const NMForm = (): JSX.Element => {
  const nextMatches = useSelector(nextMatchesSelector);
  const [firstTry, setFirstTry] = useState(false);

  const submit = (values: NextMatch[]) => {
    console.log("submit", JSON.stringify(values, null, 2));
  };

  const onClick = (
    submitForm: (() => Promise<void>) & (() => Promise<unknown>),
  ) => {
    setFirstTry(true);
    submitForm();
  };
  return nextMatches.length ? (
    <Formik
      key={JSON.stringify(nextMatches)}
      initialValues={nextMatches}
      onSubmit={submit}
      validate={validator}
      validateOnBlur={false}
      validateOnChange={firstTry}
    >
      {({ values, isValid, submitForm }) => {
        return (
          <Form className={styles.form}>
            {values.map((nm, ind) => (
              <OneMatchForm nm={nm} order={ind} key={nm.MATCHID} />
            ))}
            <Button
              variant={BUTTON_VARIANT.fill}
              color={BUTTON_COLOR.active}
              type="submit"
              onClick={() => onClick(submitForm)}
              className={styles.button}
              disabled={isScoreSaved(nextMatches) || !isValid}
            >
              Save
            </Button>
          </Form>
        );
      }}
    </Formik>
  ) : (
    <div>No next matches</div>
  );
};
