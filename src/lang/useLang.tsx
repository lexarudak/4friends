import enMessages from "./en";
import ruMessages from "./ru";
import { useSelector } from "react-redux";
import { langSelector } from "../store/app/app.selector";

export const useLang = () => {
  const lang = useSelector(langSelector);

  const messages = lang === "ru" ? ruMessages : enMessages;
  // const messages = enMessages;

  return { lang, messages };
};
