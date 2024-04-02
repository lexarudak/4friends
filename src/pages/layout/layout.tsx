import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { Menu } from "../../components/menu/menu";

export const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <Menu />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
