import { Route, Routes } from "react-router-dom";
import { ROUTE_LIST } from "./route-list";
import { Layout } from "../pages/layout/layout";
import { HomePage } from "../pages/home-page/home-page";

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path={ROUTE_LIST.home} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTE_LIST.matchdays} element={<HomePage />} />
        <Route path={ROUTE_LIST.statistic} element={<div></div>} />
        <Route path={ROUTE_LIST.rules} element={<HomePage />} />
      </Route>
      <Route path={ROUTE_LIST.login} element={<HomePage />} />
    </Routes>
  );
};
