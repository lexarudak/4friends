import enMessages from "./en";
import ruMessages from "./ru";
import { enCountries, ruCountries } from "../const/countries";
import { useSelector } from "react-redux";
import { langSelector } from "../store/app/app.selector";

export const useLang = () => {
  const lang = useSelector(langSelector);

  const messages = lang === "ru" ? ruMessages : enMessages;
  const countries = lang === "ru" ? ruCountries : enCountries;
  // const messages = enMessages;

  return { lang, messages, countries };
};
