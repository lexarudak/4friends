import { useDispatch } from "react-redux";
import { BUTTON_COLOR, BUTTON_VARIANT, Button } from "../button/button";
import styles from "./info-modal.module.scss";
import { closeModal } from "../../store/app/app.slice";
import { FC } from "react";
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  onApply?: () => void;
  onClose?: () => void;
};

export const InfoModal: FC<Props> = ({
  children,
  onApply,
  onClose,
}): JSX.Element => {
  const dispatch = useDispatch();
  const apply = () => {
    onApply && onApply();
    dispatch(closeModal());
  };

  const close = () => {
    onClose && onClose();
    dispatch(closeModal());
  };

  return (
    <div className={styles.bg} onClick={close}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={close}>
          <span className={classNames(styles.str, styles.top)}></span>
          <span className={classNames(styles.str, styles.bot)}></span>
        </button>
        <div className={styles.content}>{children}</div>
        <Button
          type="button"
          variant={BUTTON_VARIANT.fill}
          color={BUTTON_COLOR.active}
          className={styles.apply}
          onClick={apply}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};
