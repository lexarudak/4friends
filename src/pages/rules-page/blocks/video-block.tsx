import { FC, ReactNode } from "react";
import styles from "../rules-page.module.scss";
import classNames from "classnames";
import { VIDEO_VARIANT } from "../../../const/const";

type Props = {
  children?: ReactNode;
  className?: string;
  src: string;
  variant?: VIDEO_VARIANT;
};

export const VideoBlock: FC<Props> = ({
  children,
  className,
  src,
  variant = VIDEO_VARIANT.left,
}): JSX.Element => {
  return (
    <div className={classNames(className, styles.videoBlock, styles[variant])}>
      <video src={src} autoPlay className={styles.video} loop muted />
      <div className={styles.disc}>{children}</div>
    </div>
  );
};
