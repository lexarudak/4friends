import { useDispatch, useSelector } from "react-redux";
import styles from "./team-selector.module.scss";
import { countrySelector } from "../../store/matchdays/matchdays.selector";
import { setCountry } from "../../store/matchdays/matchdays.slice";
import { useLang } from "../../lang/useLang";
import { useEffect, useState } from "react";

export const TeamSelector = (): JSX.Element => {
  const dispatch = useDispatch();
  const country = useSelector(countrySelector);
  const defaultCountryState = JSON.parse(
    localStorage.getItem("isCountryOpen") ?? "true",
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
    localStorage.setItem("isCountryOpen", JSON.stringify(isCountryOpen));
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
      <p>
        {md.filter}
        <button onClick={toggleCountryState} className={styles.btn}>
          <span>{isCountryOpen ? "-" : "+"}</span>
        </button>
      </p>
    </div>
  );
};
