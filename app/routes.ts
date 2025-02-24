import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("pages/layout.tsx", [
    index("pages/createAccount.tsx"),
    route("home", "pages/home.tsx"),
    route("income", "pages/income.tsx"), 
    route("expense", "pages/expenses.tsx"),
  ])
] satisfies RouteConfig;
