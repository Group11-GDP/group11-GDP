// routes.ts
import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/profile.tsx"),
    route("home", "routes/home.tsx"),
    route("income", "routes/income.tsx"), 
    route("expense", "routes/expenseLog.tsx"),
  ])
] satisfies RouteConfig;
