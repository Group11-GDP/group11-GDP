import {Outlet} from "react-router"
import HomeIcon from "~/icons/HomeIcon"
import ProfileIcon from "~/icons/ProfileIcon"
import ReturnIcon from "~/icons/ReturnIcon"

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
            <a href ="/">
                <ProfileIcon/>
            </a>
        </nav>
    </>
}