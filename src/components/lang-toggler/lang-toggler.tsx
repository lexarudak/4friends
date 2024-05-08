import { FC, useEffect } from "react";
import { useLang } from "../../lang/useLang";
import styles from "./lang-toggler.module.scss";
import { setLang } from "../../store/app/app.slice";
import { useDispatch } from "react-redux";
import classNames from "classnames";

type Props = {
  className: string | object;
};

export const LangToggler: FC<Props> = ({ className }): JSX.Element => {
  const dispatch = useDispatch();
  const { messages, lang } = useLang();

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleLang = () => {
    dispatch(setLang(lang === "ru" ? "en" : "ru"));
  };

  return (
    <button
      className={classNames(styles.toggler, className)}
      onClick={toggleLang}
    >
      {messages.global.lang}
    </button>
  );
};
