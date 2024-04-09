import styles from "./add-room.module.scss";

export const AddRoom = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <input className={styles.input} placeholder="Add room" />
      <button className={styles.btn}>+</button>
    </div>
  );
};
