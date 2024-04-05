// import { NextMatches } from "../../components/next-matches/next-matches";
// import { useSelector } from "react-redux";
import { NextMatches } from "../../components/next-matches/next-matches";
import { Table } from "../../components/table/table";
import { Timer } from "../../components/timer/timer";
import styles from "./home-page.module.scss";
// import { nextMatchesSelector } from "../../store/next-matches/next-matches.selector";

export const HomePage = (): JSX.Element => {
  // const nextMatches = useSelector(nextMatchesSelector);
  // const fetchData = async () => {
  //   const ans = await fetch(
  //     "http://176.57.70.40:8080/rest4friends/recievedata.cfc?method=receiveData",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(nextMatches),
  //     },
  //   );
  //   const data = await ans.json();
  //   console.log({ data });
  // };
  return (
    <section className={styles.page}>
      {/* <button onClick={fetchData}>TEST</button> */}
      <Timer className={styles.timer} />
      <NextMatches />
      <Table />
    </section>
  );
};
