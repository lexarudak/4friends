import { Field, Formik } from "formik";
import { FieldError } from "../../../pages/auth/field-error";
import { Loading } from "../../loading/loading";
import styles from "./add-room.module.scss";
import { getError, roomValidator } from "../../../pages/auth/validators";
import { useState } from "react";

const DEFAULT_SUCCESS = "Room successfully added!";

export const AddRoom = (): JSX.Element => {
  const [serverErrors, setServerErrors] = useState<{
    [key: string]: string;
  }>({});
  const [successMessage, setSuccessMessage] = useState("");
  const submit = ({ room }: { room: string }) => {
    console.log({ room });
    setSuccessMessage(DEFAULT_SUCCESS);
  };
  const onFocus = (
    { target: { name } }: { target: { name: string } },
    otherName?: string,
  ) => {
    setSuccessMessage("");
    if (name in serverErrors) setServerErrors({});
    if (otherName && otherName in serverErrors) setServerErrors({});
  };

  return (
    <Formik
      initialValues={{ room: "" }}
      onSubmit={submit}
      validateOnMount={false}
      validate={roomValidator}
    >
      {({ errors, submitForm }) => (
        <div className={styles.container}>
          <Field
            type="text"
            className={styles.input}
            name="room"
            placeholder="Add room"
            onFocus={onFocus}
            disabled={false}
          />

          <div className={styles.status}>
            <FieldError
              message={
                successMessage || getError(errors.room, serverErrors?.room)
              }
              className={successMessage ? styles.success : ""}
            />
            <Loading size={20} loading={false} />
          </div>

          <button className={styles.btn} type="submit" onClick={submitForm}>
            +
          </button>
        </div>
      )}
    </Formik>
  );
};
