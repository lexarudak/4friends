import { useDispatch, useSelector } from "react-redux";
import styles from "./team-selector.module.scss";
import { countrySelector } from "../../store/matchdays/matchdays.selector";
import { setCountry } from "../../store/matchdays/matchdays.slice";

export const TeamSelector = (): JSX.Element => {
  const dispatch = useDispatch();
  const country = useSelector(countrySelector);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCountry(e.target.value));
  };
  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.field}
        onChange={onChange}
        value={country}
        placeholder="All countries"
      />
      <p>Country filter</p>
    </div>
  );
};
