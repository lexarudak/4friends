import { Route, Routes } from "react-router-dom";
import { ROUTE_LIST } from "./route-list";
import { Layout } from "../pages/layout/layout";
import { HomePage } from "../pages/home-page/home-page";
import { MatchdaysPage } from "../pages/matchdays-page/matchdays-page";
import { LoginPage } from "../pages/auth/login-page";
import { RegisterPage } from "../pages/auth/register-page";

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path={ROUTE_LIST.home} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTE_LIST.matchdays} element={<MatchdaysPage />} />
        <Route path={ROUTE_LIST.statistic} element={<div></div>} />
        <Route path={ROUTE_LIST.rules} element={<HomePage />} />
        <Route path={ROUTE_LIST.login} element={<LoginPage />} />
        <Route path={ROUTE_LIST.register} element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};
