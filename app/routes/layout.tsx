import { Outlet } from "react-router";
import ExpenseIcon from "~/icons/ExpenseIcon";
import HomeIcon from "~/icons/HomeIcon";
import ProfileIcon from "~/icons/ProfileIcon";
import ReturnIcon from "~/icons/ReturnIcon";

export default function Layout() {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <a href="/">
          <ReturnIcon />
        </a>
      </header>

      <main className="layout-content">
        <Outlet />
      </main>

      <nav className="layout-nav">
        <a href="/">
          <HomeIcon />
        </a>
        <a href="/expense">
        <ExpenseIcon/>
        </a>
        <a href="/">
          <ProfileIcon />
        </a>
      </nav>
    </div>
  );
}