import { useDispatch, useSelector } from "react-redux";
import styles from "./room-selector.module.scss";
import { userSelector } from "../../store/user/user.selector";
import { MouseEvent } from "react";
import classNames from "classnames";
import { AddRoom } from "./add-room/add-room";
import { useLazySetRoomQuery, useLazyUserQuery } from "../../store/api";
import { isRoomSelectorOpenSelector } from "../../store/app/app.selector";
import {
  closeMenu,
  closeRoomSelector,
  toggleRoomSelector,
} from "../../store/app/app.slice";

export const RoomSelector = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const isRoomSelectorOpen = useSelector(isRoomSelectorOpenSelector);
  const { ACTIVEROOMID, ROOMS, USERID } = useSelector(userSelector);
  const [send, { isFetching }] = useLazySetRoomQuery();
  const [updateUser] = useLazyUserQuery({});

  const closeSelector = () => dispatch(closeRoomSelector());

  const onClick = async (e: MouseEvent) => {
    const { id } = e.target as HTMLButtonElement;
    if (isRoomSelectorOpen && id !== ACTIVEROOMID) {
      const { data } = await send({
        USERID,
        ROOMID: id,
      });

      if (data.SUCCESS) {
        closeSelector();
        updateUser({});
      }
    } else {
      dispatch(closeMenu());
      dispatch(toggleRoomSelector());
    }
  };

  const activeCn = {
    [styles.active]: isRoomSelectorOpen,
  };
  const hideCn = {
    [styles.hide]: !isRoomSelectorOpen,
  };
  const cn = {
    ...activeCn,
    [styles.container]: true,
  };

  if (!ACTIVEROOMID) {
    return null;
  }

  return (
    <>
      <div className={classNames(cn)}>
        <AddRoom
          isLoading={isFetching}
          isOpen={isRoomSelectorOpen}
          className={classNames(activeCn)}
        />
        {Object.entries(ROOMS).map(([key, room]) =>
          key === ACTIVEROOMID ? null : (
            <button
              onClick={onClick}
              className={classNames(styles.btn, hideCn)}
              key={key}
              name={room}
              id={key}
            >
              {room}
            </button>
          ),
        )}

        <button
          onClick={onClick}
          className={classNames(styles.btn, activeCn)}
          name={ROOMS[ACTIVEROOMID]}
          id={ACTIVEROOMID}
        >
          {ROOMS[ACTIVEROOMID]}
        </button>
      </div>
    </>
  );
};
