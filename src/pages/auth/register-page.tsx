import { Field, Form, Formik } from "formik";
import styles from "./auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_LIST } from "../../router/route-list";
import {
  BUTTON_COLOR,
  BUTTON_VARIANT,
  Button,
} from "../../components/button/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  closeMenu,
  openModal,
  removeServerError,
  setIsPageLoading,
} from "../../store/app/app.slice";
import { FieldError } from "./field-error";
import { getError, registerValidator } from "./validators";
import { InfoModal } from "../../components/info-modal/info-modal";
import {
  isModalOpenSelector,
  isServerErrorSelector,
} from "../../store/app/app.selector";
import { EnTermsOfService } from "./en-text";
import { RuTermsOfService } from "./ru-text";
import { useLazyRegisterQuery, useLazyUserQuery } from "../../store/api";
import { Loading } from "../../components/loading/loading";
import { CSSTransition } from "react-transition-group";
import { useLang } from "../../lang/useLang";
import { LangToggler } from "../../components/lang-toggler/lang-toggler";

export type RegisterValues = {
  login: string;
  email: string;
  password: string;
  password2: string;
  room: string;
  checkbox: boolean;
};

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
  const [serverErrors, setServerErrors] = useState<{
    [key: string]: string;
  }>({});
  const navigate = useNavigate();
  const [shouldValidate, setShouldValidate] = useState(false);
  const [register, { isFetching, currentData }] = useLazyRegisterQuery();
  const [user] = useLazyUserQuery();
  const severError = useSelector(isServerErrorSelector);
  const {
    messages: { auth },
    lang,
  } = useLang();

  const isModalOpen = useSelector(isModalOpenSelector);

  const submit = async (values: RegisterValues) => {
    dispatch(removeServerError());
    const { data } = await register(values);
    if (data && data.SUCCESS) {
      const { data: userData } = await user({});
      if (userData && userData.SUCCESS) {
        dispatch(setIsPageLoading(true));
        navigate(ROUTE_LIST.home);
      }
    }
  };

  useEffect(() => {
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

  const showModal = () => {
    dispatch(openModal());
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
    if (name in serverErrors) setServerErrors({});
    if (otherName && otherName in serverErrors) setServerErrors({});
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validate={registerValidator}
        validateOnChange={shouldValidate}
        validateOnBlur={shouldValidate}
      >
        {({ errors, isValid, setFieldValue }) => (
          <>
            <LangToggler
              className={{
                [styles.toggler]: true,
              }}
            />
            <h2 className={styles.title}>
              {auth.reg}
              <span className={styles.subtitle}>{" | "}</span>
              {
                <Link to={ROUTE_LIST.login} className={styles.link}>
                  {auth.login}
                </Link>
              }
              <Loading loading={isFetching} />
            </h2>
            <Form className={styles.form}>
              <p className={styles.text}>{auth.username}</p>
              <Field
                type="text"
                className={styles.field}
                name="login"
                onFocus={onFocus}
                disabled={isFetching}
              />
              <FieldError
                message={getError(errors.login, serverErrors?.login)}
              />
              <p className={styles.text}>{auth.email}</p>
              <Field
                type="email"
                className={styles.field}
                name="email"
                onFocus={(e: { target: { name: string } }) =>
                  onFocus(e, "login")
                }
                disabled={isFetching}
              />
              <FieldError
                message={getError(errors.email, serverErrors?.login)}
              />

              <div className={styles.block}>
                <div className={styles.subBlock}>
                  <p className={styles.text}>{auth.pass}</p>
                  <Field
                    type="password"
                    className={styles.field}
                    name="password"
                    disabled={isFetching}
                  />
                </div>
                <div className={styles.subBlock}>
                  <p className={styles.text}>{auth.confPass}</p>
                  <Field
                    type="password"
                    className={styles.field}
                    name="password2"
                    disabled={isFetching}
                  />
                </div>
              </div>
              <FieldError message={getError(errors.password)} />

              <p className={styles.text}>{auth.room}</p>
              <Field
                type="text"
                className={styles.field}
                name="room"
                onFocus={onFocus}
                disabled={isFetching}
              />
              <FieldError message={getError(errors.room, serverErrors?.room)} />
              <div className={styles.policy}>
                <Field
                  type="checkbox"
                  className={styles.checkbox}
                  name="checkbox"
                  disabled={isFetching}
                  si
                />
                <button
                  type="button"
                  onClick={showModal}
                  className={styles.policyText}
                  disabled={isFetching}
                >
                  {auth.policy}
                </button>
              </div>
              <FieldError message={getError(errors.checkbox)} />

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
                {auth.regBtn}
              </Button>
              <FieldError message={severError.message} />
              <CSSTransition
                in={isModalOpen}
                timeout={200}
                classNames="popup"
                unmountOnExit
              >
                <InfoModal onApply={() => setFieldValue("checkbox", true)}>
                  {
                    <p>
                      {lang === "ru" ? RuTermsOfService() : EnTermsOfService()}
                    </p>
                  }
                </InfoModal>
              </CSSTransition>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};
