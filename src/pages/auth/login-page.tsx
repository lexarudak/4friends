import { Field, Form, Formik } from "formik";
import styles from "./auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_LIST } from "../../router/route-list";
import { Button } from "../../components/button/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  closeMenu,
  removeServerError,
  setIsPageLoading,
  setServerError,
} from "../../store/app/app.slice";
import { FieldError } from "./field-error";
import { getError, loginValidator } from "./validators";
import { Loading } from "../../components/loading/loading";
import { useLazyLoginQuery, useLazyUserQuery } from "../../store/api";
import { isServerErrorSelector } from "../../store/app/app.selector";
import { useLang } from "../../lang/useLang";
import { BUTTON_COLOR, BUTTON_VARIANT } from "../../const/const";

export type LoginValues = {
  email: string;
  password: string;
};

const initialValues: LoginValues = {
  email: "",
  password: "",
};

export const LoginPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shouldValidate, setShouldValidate] = useState(false);
  const severError = useSelector(isServerErrorSelector);
  const [serverErrors, setServerErrors] = useState<{
    [key: string]: string;
  }>({});
  const [login, { isFetching, currentData, isError }] = useLazyLoginQuery();
  const [user] = useLazyUserQuery();
  const {
    messages: { auth },
  } = useLang();

  const submit = async (values: LoginValues) => {
    dispatch(removeServerError());
    const { data } = await login(values);

    if (data && data.SUCCESS) {
      await user({});
    }

    if (!data?.SUCCESS && !data.ERRORFIELD) {
      dispatch(setServerError({ isError: true, message: "Server error" }));
    }
  };

  useEffect(() => {
    if (isError) {
      dispatch(setServerError({ isError: true, message: "Login error" }));
    }

    if (currentData?.ERRORFIELD) {
      setServerErrors({
        [currentData.ERRORFIELD]: currentData.MESSAGE,
      });
    } else {
      setServerErrors({});
    }
  }, [currentData, isFetching, navigate, isError, dispatch]);

  const onClick = () => {
    setShouldValidate(true);
  };

  useEffect(() => {
    dispatch(setIsPageLoading(false));
    dispatch(removeServerError());
    dispatch(closeMenu());
  }, []);

  const onFocus = (
    { target: { name } }: { target: { name: string } },
    otherName?: string,
  ) => {
    dispatch(removeServerError());
    if (name in serverErrors) setServerErrors({});
    if (otherName && otherName in serverErrors) setServerErrors({});
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validate={loginValidator}
        validateOnChange={shouldValidate}
        validateOnBlur={shouldValidate}
      >
        {({ errors, isValid }) => (
          <>
            <h2 className={styles.title}>
              {auth.login}
              <span className={styles.subtitle}>{" | "}</span>
              {
                <Link to={ROUTE_LIST.register} className={styles.link}>
                  {auth.reg}
                </Link>
              }
              <Loading loading={isFetching} />
            </h2>
            <Form className={styles.form}>
              <p className={styles.text}>{auth.email}</p>
              <Field
                type="email"
                className={styles.field}
                name="email"
                onFocus={onFocus}
                disabled={isFetching}
              />
              <FieldError
                message={getError(errors.email, serverErrors?.email)}
              />
              <p className={styles.text}>{auth.pass}</p>
              <Field
                type="password"
                className={styles.field}
                name="password"
                onFocus={onFocus}
                disabled={isFetching}
              />
              <FieldError
                message={getError(errors.password, serverErrors?.password)}
              />

              <Button
                type="submit"
                color={BUTTON_COLOR.active}
                variant={BUTTON_VARIANT.fill}
                disabled={
                  !isValid || !!Object.keys(serverErrors).length || isFetching
                }
                onClick={onClick}
                className={styles.button}
              >
                {auth.login}
              </Button>
              <FieldError message={severError.message} />
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};
