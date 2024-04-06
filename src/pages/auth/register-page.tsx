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
  login: string;
  email: string;
  password: string;
  password2: string;
  room: string;
  checkbox: boolean;
};

const POLICY_TEXT =
  "I have read and agree to the Terms of Service and Privacy Policy.";

const initialValues: RegisterValues = {
  login: "",
  email: "",
  password: "",
  password2: "",
  room: "",
  checkbox: false,
};

export const RegisterPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shouldValidate, setShouldValidate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const submit = async (values: RegisterValues) => {
    console.log(values);
    navigate(ROUTE_LIST.home);
  };

  const onClick = () => {
    setShouldValidate(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
    console.log({ isModalOpen });
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
            <p className={styles.text}>Login</p>
            <Field type="text" className={styles.field} name="login" />
            <FieldError message={getError(errors.login)} />
            <p className={styles.text}>Email</p>
            <Field type="email" className={styles.field} name="email" />
            <FieldError message={getError(errors.email)} />

            <div className={styles.block}>
              <div className={styles.subBlock}>
                <p className={styles.text}>Password</p>
                <Field
                  type="password"
                  className={styles.field}
                  name="password"
                />
              </div>
              <div className={styles.subBlock}>
                <p className={styles.text}>Confirm Password</p>
                <Field
                  type="password"
                  className={styles.field}
                  name="password2"
                />
              </div>
            </div>
            <FieldError message={getError(errors.password)} />

            <p className={styles.text}>Room</p>
            <Field type="text" className={styles.field} name="room" />
            <FieldError message={getError(errors.room)} />
            <div className={styles.policy}>
              <Field
                type="checkbox"
                className={styles.checkbox}
                name="checkbox"
              />
              <button
                type="button"
                onClick={showModal}
                className={styles.policyText}
              >
                {POLICY_TEXT}
              </button>
            </div>
            <FieldError message={getError(errors.password)} />

            <Button
              type="submit"
              color={BUTTON_COLOR.active}
              variant={BUTTON_VARIANT.fill}
              disabled={!isValid}
              onClick={onClick}
              className={styles.button}
            >
              Register
            </Button>
            <Link to={ROUTE_LIST.login} className={styles.link}>
              Login
            </Link>
          </Form>
        </>
      )}
    </Formik>
  );
};
