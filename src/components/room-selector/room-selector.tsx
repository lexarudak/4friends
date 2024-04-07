import { useDispatch, useSelector } from "react-redux";
import styles from "./room-selector.module.scss";
import {
  activeRoomSelector,
  roomsSelector,
} from "../../store/user/user.selector";
import { MouseEvent, useState } from "react";
import classNames from "classnames";
import { setActiveRoom } from "../../store/user/user.slice";

export const RoomSelector = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeRoom = useSelector(activeRoomSelector);
  const dispatch = useDispatch();
  const rooms = useSelector(roomsSelector);
  const onClick = (e: MouseEvent) => {
    const { name } = e.target as HTMLButtonElement;
    console.log({ name, activeRoom });
    setIsMenuOpen((prev) => !prev);
    dispatch(setActiveRoom(name));
  };

  const cn = {
    [styles.container]: true,
    [styles.active]: isMenuOpen,
  };

  return (
    <div className={classNames(cn)}>
      {isMenuOpen
        ? rooms.map((room) =>
            room === activeRoom ? null : (
              <button
                onClick={onClick}
                className={styles.btn}
                key={room}
                name={room}
              >
                {room}
              </button>
            ),
          )
        : null}
      <button onClick={onClick} className={styles.btn} name={activeRoom}>
        {activeRoom}
      </button>
    </div>
  );
};
