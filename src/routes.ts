import { RouteProps } from "react-router-dom";

import Home from "components/home";
import Services from "./services/services";

export const routes: Array<RouteProps> = [
  {
    path: "/",
    component: Home,
  },
];

export const privateRoutes: Array<RouteProps> = [];
