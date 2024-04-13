import { useSelector } from "react-redux";
import styles from "./room-selector.module.scss";
import {
  activeRoomSelector,
  roomsSelector,
  userIdSelector,
} from "../../store/user/user.selector";
import { MouseEvent, useState } from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import { AddRoom } from "./add-room/add-room";
import { useLazySetRoomQuery, useLazyUserQuery } from "../../store/api";

export const RoomSelector = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeRoom = useSelector(activeRoomSelector);
  const rooms = useSelector(roomsSelector);
  const userid = useSelector(userIdSelector);
  const [send, { isFetching }] = useLazySetRoomQuery();
  const [updateUser] = useLazyUserQuery({});

  const onClick = async (e: MouseEvent) => {
    const { id } = e.target as HTMLButtonElement;
    if (isMenuOpen && id !== activeRoom) {
      const { data } = await send({
        userid,
        roomid: id,
      });

      if (data.SUCCESS) {
        setIsMenuOpen((prev) => !prev);
        updateUser({});
      }
    } else {
      setIsMenuOpen((prev) => !prev);
    }
  };

  isMenuOpen
    ? document.body.classList.add("hold")
    : document.body.classList.remove("hold");

  const cn = {
    [styles.container]: true,
    [styles.active]: isMenuOpen,
  };

  return (
    <>
      <div className={styles.mobileDeco} />
      <div className={classNames(cn)}>
        <AddRoom isLoading={isFetching} isOpen={isMenuOpen} />
        {Object.entries(rooms).map(([key, room]) =>
          key === activeRoom ? null : (
            <button
              onClick={onClick}
              className={styles.btn}
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
          className={classNames(styles.btn, isMenuOpen ? styles.active : "")}
          name={rooms[activeRoom]}
          id={activeRoom}
        >
          {rooms[activeRoom]}
        </button>
      </div>

      <CSSTransition
        in={isMenuOpen}
        timeout={200}
        classNames="fade"
        unmountOnExit
      >
        <div className={styles.bg} onClick={() => setIsMenuOpen(false)} />
      </CSSTransition>
    </>
  );
};
