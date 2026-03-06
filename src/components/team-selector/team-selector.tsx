import { useDispatch, useSelector } from "react-redux";
import styles from "./team-selector.module.scss";
import { countrySelector } from "../../store/matchdays/matchdays.selector";
import { setCountry } from "../../store/matchdays/matchdays.slice";
import { useLang } from "../../lang/useLang";
import { useEffect, useState } from "react";
import { LS_COUNTRY_OPEN } from "../../const/const";

export const TeamSelector = (): JSX.Element => {
  const dispatch = useDispatch();
  const country = useSelector(countrySelector);
  const defaultCountryState = JSON.parse(
    localStorage.getItem(LS_COUNTRY_OPEN.key) ?? LS_COUNTRY_OPEN.true,
  );
  const [isCountryOpen, setIsCountryOpen] =
    useState<boolean>(defaultCountryState);
  const {
    messages: { md },
  } = useLang();

  const toggleCountryState = () => {
    setIsCountryOpen((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem(LS_COUNTRY_OPEN.key, JSON.stringify(isCountryOpen));
  }, [isCountryOpen]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCountry(e.target.value));
  };
  return (
    <div className={styles.container}>
      {isCountryOpen && (
        <input
          type="text"
          className={styles.field}
          onChange={onChange}
          value={country}
          placeholder={md.all}
        />
      )}
      <p className={styles.p}>
        {md.filter}
        <button onClick={toggleCountryState} className={styles.btn}>
          <span />
          {!isCountryOpen && <span />}
        </button>
      </p>
    </div>
  );
};
