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
import { isScoreChanged } from "../../../helpers";
import { useLazySetNextMatchesQuery } from "../../../store/api";
import { userSelector } from "../../../store/user/user.selector";
import { FieldError } from "../../../pages/auth/field-error";
import { CSSTransition } from "react-transition-group";

const SAVED_BANNER_TIME = 1000;

export const NMForm = (): JSX.Element | null => {
  const nextMatches = useSelector(nextMatchesSelector);
  const { USERNAME, ACTIVEROOMID, USERID } = useSelector(userSelector);
  const [firstTry, setFirstTry] = useState(false);
  const [setNM, { isFetching, isError }] = useLazySetNextMatchesQuery();
  const isLoading = useSelector(isNMLoadingSelector);
  const dispatch = useDispatch();
  const [isSavedBanner, setIsSavedBanner] = useState(false);

  const showBanner = () => {
    setIsSavedBanner(true);
    setTimeout(() => {
      setIsSavedBanner(false);
    }, SAVED_BANNER_TIME);
  };

  const submit = async (NMDATA: NextMatch[]) => {
    const { data } = await setNM({
      NMDATA,
      USERNAME,
      ACTIVEROOMID,
      USERID,
    });
    if (data?.SUCCESS) {
      showBanner();
      setFirstTry(false);
    }
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

  if (isLoading && !nextMatches.length) {
    return null;
  }

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
            <div className={styles.bannerContainer}>
              {values.map((nm, ind) => (
                <OneMatchForm nm={nm} order={ind} key={nm.MATCHID} />
              ))}
              <CSSTransition
                in={isSavedBanner || isFetching}
                timeout={200}
                classNames="fade"
                unmountOnExit
              >
                <CSSTransition
                  in={isSavedBanner}
                  timeout={200}
                  classNames="fade"
                  unmountOnExit
                >
                  <div className={styles.banner}>Saved successfully!</div>
                </CSSTransition>
              </CSSTransition>
            </div>

            <Button
              variant={BUTTON_VARIANT.fill}
              color={BUTTON_COLOR.active}
              type="submit"
              onClick={() => onClick(submitForm)}
              className={styles.button}
              disabled={!isScoreChanged(values) || !isValid || isLoading}
            >
              Save
            </Button>
            <FieldError
              message={isError ? "Something went wrong. Try again" : ""}
              className={styles.error}
            />
          </Form>
        );
      }}
    </Formik>
  ) : (
    <div className={styles.form}>No next matches</div>
  );
};
