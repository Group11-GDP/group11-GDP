import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/layout.tsx", [
        index("routes/home.tsx"),
        route("income", "routes/income.tsx"),
        route("expense", "routes/expenseLog.tsx"),
        route("profile", "routes/profile.tsx"),
    ])
] satisfies RouteConfig;

