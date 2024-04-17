import { useDispatch, useSelector } from "react-redux";
import styles from "./nm-form.module.scss";
import { Formik, Form } from "formik";
import {
  isNMLoadingSelector,
  nextMatchesSelector,
} from "../../../store/next-matches/next-matches.selector";
import {
  NextMatch,
  setNMIsSetting,
} from "../../../store/next-matches/next-matches.slice";
import { OneMatchForm } from "../one-match-form/one-match-form";
import { BUTTON_COLOR, BUTTON_VARIANT, Button } from "../../button/button";
import { validator } from "./validator";
import { useEffect, useState } from "react";
import { isScoreSaved } from "../../../helpers";
import {
  useLazyGetNextMatchesQuery,
  useLazySetNextMatchesQuery,
} from "../../../store/api";
import { userSelector } from "../../../store/user/user.selector";

export const NMForm = (): JSX.Element => {
  const nextMatches = useSelector(nextMatchesSelector);
  const { username, activeRoom, userId } = useSelector(userSelector);
  const [firstTry, setFirstTry] = useState(false);
  const [setNM, { isFetching }] = useLazySetNextMatchesQuery();
  const [getNM] = useLazyGetNextMatchesQuery();
  const isLoading = useSelector(isNMLoadingSelector);
  const dispatch = useDispatch();

  const submit = async (values: NextMatch[]) => {
    console.log("set NM");
    const { data } = await setNM({
      nmData: values,
      username,
      activeroomID: activeRoom,
      userid: userId,
    });
    if (data?.SUCCESS) {
      await getNM({});
    }
    console.log("nm response", data);
  };

  const onClick = (
    submitForm: (() => Promise<void>) & (() => Promise<unknown>),
  ) => {
    setFirstTry(true);
    submitForm();
  };

  useEffect(() => {
    dispatch(setNMIsSetting(isFetching));
  }, [isFetching, dispatch]);

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
              disabled={isScoreSaved(values) || !isValid || isLoading}
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
