import { Field, Formik } from "formik";
import { FieldError } from "../../../pages/auth/field-error";
import { Loading } from "../../loading/loading";
import styles from "./add-room.module.scss";
import { getError, roomValidator } from "../../../pages/auth/validators";
import { FC, useState } from "react";
import { useLazyAddRoomQuery, useLazyUserQuery } from "../../../store/api";
import { useSelector } from "react-redux";
import { userIdSelector } from "../../../store/user/user.selector";

const DEFAULT_SUCCESS = "Room successfully added!";

type ServerError = {
  [key: string]: string;
};

type Props = {
  severError?: ServerError;
  isLoading?: boolean;
};

export const AddRoom: FC<Props> = ({ severError, isLoading }): JSX.Element => {
  const [serverErrors, setServerErrors] = useState(severError || {});
  const [successMessage, setSuccessMessage] = useState("");
  const userid = useSelector(userIdSelector);

  const [send, { isFetching }] = useLazyAddRoomQuery();
  const [updateUser, { isFetching: updateFetching }] = useLazyUserQuery({});

  const submit = async ({ room }: { room: string }) => {
    const { data } = await send({
      userid,
      roomname: room,
    });

    if (data.SUCCESS) {
      setSuccessMessage(DEFAULT_SUCCESS);
      updateUser({});
    }

    if (!data.SUCCESS) {
      setServerErrors({ room: data.MESSAGE || "Server error" });
    }
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
            <Loading
              size={20}
              loading={isLoading || isFetching || updateFetching}
            />
          </div>

          <button className={styles.btn} type="submit" onClick={submitForm}>
            +
          </button>
        </div>
      )}
    </Formik>
  );
};
