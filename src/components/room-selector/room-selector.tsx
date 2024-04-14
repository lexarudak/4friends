import { useDispatch, useSelector } from "react-redux";
import styles from "./room-selector.module.scss";
import {
  activeRoomSelector,
  roomsSelector,
  userIdSelector,
} from "../../store/user/user.selector";
import { MouseEvent } from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import { AddRoom } from "./add-room/add-room";
import { useLazySetRoomQuery, useLazyUserQuery } from "../../store/api";
import { isRoomSelectorOpenSelector } from "../../store/app/app.selector";
import {
  closeRoomSelector,
  toggleRoomSelector,
} from "../../store/app/app.slice";

export const RoomSelector = (): JSX.Element => {
  const dispatch = useDispatch();
  const isRoomSelectorOpen = useSelector(isRoomSelectorOpenSelector);
  const activeRoom = useSelector(activeRoomSelector);
  const rooms = useSelector(roomsSelector);
  const userid = useSelector(userIdSelector);
  const [send, { isFetching }] = useLazySetRoomQuery();
  const [updateUser] = useLazyUserQuery({});

  const closeSelector = () => dispatch(closeRoomSelector());

  const onClick = async (e: MouseEvent) => {
    const { id } = e.target as HTMLButtonElement;
    if (isRoomSelectorOpen && id !== activeRoom) {
      const { data } = await send({
        userid,
        roomid: id,
      });

      if (data.SUCCESS) {
        closeSelector();
        updateUser({});
      }
    } else {
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

  return (
    <>
      <div className={styles.mobileDeco} />
      <div className={classNames(cn)}>
        <AddRoom
          isLoading={isFetching}
          isOpen={isRoomSelectorOpen}
          className={classNames(activeCn)}
        />
        {Object.entries(rooms).map(([key, room]) =>
          key === activeRoom ? null : (
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
          name={rooms[activeRoom]}
          id={activeRoom}
        >
          {rooms[activeRoom]}
        </button>
      </div>

      <CSSTransition
        in={isRoomSelectorOpen}
        timeout={200}
        classNames="fade"
        unmountOnExit
      >
        <div className={styles.bg} onClick={closeSelector} />
      </CSSTransition>
    </>
  );
};
