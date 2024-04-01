import { Route, Routes } from "react-router-dom";
import { ROUTE_LIST } from "./route-list";
import { Layout } from "../pages/layout/layout";
import { HomePage } from "../pages/home-page/home-page";

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path={ROUTE_LIST.home} element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
};
