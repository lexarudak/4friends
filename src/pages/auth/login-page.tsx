import { Field, Form, Formik } from "formik";
import styles from "./auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_LIST } from "../../router/route-list";
import {
  BUTTON_COLOR,
  BUTTON_VARIANT,
  Button,
} from "../../components/button/button";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { closeMenu } from "../../store/app/app.slice";
import { FieldError } from "./field-error";
import { getError, loginValidator } from "./validators";
import { Loading } from "../../components/loading/loading";
import { useLazyLoginQuery } from "../../store/api";
import Cookies from "js-cookie";

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
  const [serverErrors, setServerErrors] = useState<{
    [key: string]: string;
  }>({});
  const [login, { isFetching, currentData, isError }] = useLazyLoginQuery();
  const submit = async (values: LoginValues) => {
    login(values);
  };

  useEffect(() => {
    if (currentData?.SUCCESS) {
      Cookies.set("TOKEN", currentData.TOKEN);
      navigate(ROUTE_LIST.home);
      return;
    }

    if (currentData?.ERRORFIELD) {
      setServerErrors({
        [currentData.ERRORFIELD]: currentData.MESSAGE,
      });
    } else {
      setServerErrors({});
    }
  }, [currentData, isFetching, navigate]);

  const onClick = () => {
    setShouldValidate(true);
  };

  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  const onFocus = (
    { target: { name } }: { target: { name: string } },
    otherName?: string,
  ) => {
    if (name in serverErrors) setServerErrors({});
    if (otherName && otherName in serverErrors) setServerErrors({});
  };

  return (
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
            Login
            <span className={styles.subtitle}>{" | "}</span>
            {
              <Link to={ROUTE_LIST.register} className={styles.link}>
                Register
              </Link>
            }
            <Loading loading={false} />
          </h2>
          <Form className={styles.form}>
            <p className={styles.text}>Email</p>
            <Field
              type="email"
              className={styles.field}
              name="email"
              onFocus={onFocus}
              disabled={isFetching}
            />
            <FieldError message={getError(errors.email, serverErrors?.email)} />
            <p className={styles.text}>Password</p>
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
              Login
            </Button>
            <FieldError message={isError ? "Server error" : undefined} />
          </Form>
        </>
      )}
    </Formik>
  );
};
