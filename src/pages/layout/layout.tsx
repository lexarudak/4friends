import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";

export const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
