import {Outlet} from "react-router"
import ExpenseIcon from "~/icons/ExpenseIcon";
import HomeIcon from "~/icons/HomeIcon"
import ProfileIcon from "~/icons/ProfileIcon"
import ReturnIcon from "~/icons/ReturnIcon"
import LogIcon from "~/icons/LogIcon"

export default function Layout() {
    return <>
        <header>
            <a href ="/">
                <ReturnIcon/>
            </a>
        </header>
        <Outlet/>
        <nav>
            <a href ="/">
                <HomeIcon/>
            </a>
            <a href="/expense">
                <ExpenseIcon/>
            </a>
            <a href="/income">
                <LogIcon/>
            </a>
            <a href ="/profile">
                <ProfileIcon/>
            </a>
        </nav>
    </>
}