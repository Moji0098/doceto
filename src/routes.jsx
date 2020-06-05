import Home from "./pages/Home";
import Filter from "./pages/Search";

const routes = [
  {
    id: 11111,
    exact: true,
    path: "/",
    component: Home,
  },
  {
    id: 22222,
    exact: false,
    path: "/search/speciality",
    component: Filter,
  },
];
export default routes;
