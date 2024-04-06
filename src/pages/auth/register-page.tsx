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
import { registerValidator } from "./validators";

export type RegisterValues = {
  email: string;
  password: string;
  password2: string;
  room: string;
};

const initialValues: RegisterValues = {
  email: "",
  password: "",
  password2: "",
  room: "",
};

export const RegisterPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shouldValidate, setShouldValidate] = useState(false);
  const submit = async (values: RegisterValues) => {
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
      validate={registerValidator}
      validateOnChange={shouldValidate}
      validateOnBlur={shouldValidate}
    >
      {({ errors, isValid }) => (
        <>
          <h2 className={styles.title2}>Register</h2>
          <Form className={styles.form}>
            <p className={styles.text}>Email</p>
            <Field type="email" className={styles.field} name="email" />
            <FieldError message={getError(errors.email)} />
            <p className={styles.text}>Password</p>
            <Field type="password" className={styles.field} name="password" />
            <FieldError message={getError(errors.password)} />
            <p className={styles.text}>Confirm Password</p>
            <Field type="password" className={styles.field} name="password2" />
            <FieldError message={getError(errors.password2)} />
            <p className={styles.text}>Room</p>
            <Field type="text" className={styles.field} name="room" />
            <FieldError message={getError(errors.room)} />
            <Link to={ROUTE_LIST.login} className={styles.register}>
              Login
            </Link>
            <Button
              type="submit"
              color={BUTTON_COLOR.active}
              variant={BUTTON_VARIANT.fill}
              disabled={!isValid}
              onClick={onClick}
            >
              Register
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
};
