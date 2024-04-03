import { useSelector } from "react-redux";
import styles from "./nm-form.module.scss";
import { Formik, Form } from "formik";
import { nextMatchesSelector } from "../../../store/next-matches/next-matches.selector";
import { NextMatch } from "../../../store/next-matches/next-matches.slice";
import { OneMatchForm } from "../one-match-form/one-match-form";
import { BUTTON_COLOR, BUTTON_VARIANT, Button } from "../../button/button";

export const NMForm = (): JSX.Element => {
  const nextMatches = useSelector(nextMatchesSelector);

  const submit = (values: NextMatch[]) => {
    console.log("submit", JSON.stringify(values, null, 2));
  };
  return (
    <Formik initialValues={nextMatches} onSubmit={submit}>
      {({ values }) => (
        <Form className={styles.form}>
          {values.map((nm, ind) => (
            <OneMatchForm nm={nm} order={ind} key={nm.id} />
          ))}
          <Button
            variant={BUTTON_VARIANT.fill}
            color={BUTTON_COLOR.active}
            type="submit"
            className={styles.button}
            disabled
          >
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};
