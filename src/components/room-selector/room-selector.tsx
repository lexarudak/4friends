import { useDispatch, useSelector } from "react-redux";
import styles from "./room-selector.module.scss";
import {
  activeRoomSelector,
  roomsSelector,
} from "../../store/user/user.selector";
import { MouseEvent, useState } from "react";
import classNames from "classnames";
import { setActiveRoom } from "../../store/user/user.slice";
import { CSSTransition } from "react-transition-group";
import { AddRoom } from "./add-room/add-room";

export const RoomSelector = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeRoom = useSelector(activeRoomSelector);
  const dispatch = useDispatch();
  const rooms = useSelector(roomsSelector);
  const onClick = (e: MouseEvent) => {
    const { id } = e.target as HTMLButtonElement;
    setIsMenuOpen((prev) => !prev);
    dispatch(setActiveRoom(id));
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
      <div className={classNames(cn)}>
        <AddRoom />
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
