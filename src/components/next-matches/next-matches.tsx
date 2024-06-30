import classNames from "classnames";
import styles from "./next-matches.module.scss";
import { FC } from "react";
import { NMForm } from "./nm-form.tsx/nm-form";
import { Loading } from "../loading/loading";
import { useSelector } from "react-redux";
import { isNMLoadingSelector } from "../../store/next-matches/next-matches.selector";
import { useLang } from "../../lang/useLang";

type Props = {
  className?: string;
};

export const NextMatches: FC<Props> = ({ className }): JSX.Element => {
  const isLoading = useSelector(isNMLoadingSelector);
  const { messages } = useLang();

  return (
    <section className={classNames(styles.container, className)}>
      <h2 className={styles.title}>
        {messages.nm.title} <Loading loading={isLoading} />
      </h2>
      <NMForm />
    </section>
  );
};
