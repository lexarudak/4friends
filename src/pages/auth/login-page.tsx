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
import { loginValidator } from "./validators";

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
  const submit = async (values: LoginValues) => {
    console.log(values);

    navigate(ROUTE_LIST.home);
  };

  const onClick = () => {
    setShouldValidate(true);
  };

  const getError = (validateError?: string, serverError?: string) =>
    validateError || serverError;

  useEffect(() => {
    dispatch(closeMenu());
  }, []);

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
          <h2 className={styles.title}>Login</h2>
          <Form className={styles.form}>
            <p className={styles.text}>Email</p>
            <Field type="email" className={styles.field} name="email" />
            <FieldError message={getError(errors.email)} />
            <p className={styles.text}>Password</p>
            <Field type="password" className={styles.field} name="password" />
            <FieldError message={getError(errors.password)} />

            <Button
              type="submit"
              color={BUTTON_COLOR.active}
              variant={BUTTON_VARIANT.fill}
              disabled={!isValid}
              onClick={onClick}
              className={styles.button}
            >
              Login
            </Button>
            <Link to={ROUTE_LIST.register} className={styles.link}>
              Register
            </Link>
          </Form>
        </>
      )}
    </Formik>
  );
};
