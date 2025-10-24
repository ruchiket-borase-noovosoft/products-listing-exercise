import {NavLink, useLocation} from "react-router-dom";
import UserDropdown from "./UserDropdown.tsx";
import CartIcon from "./interactive/icons/CartIcon.tsx";
import {useContext} from "react";
import {StoreProvider} from "../utils/store.ts";

export default function Navbar () {
    const data = useContext(StoreProvider)
    const path = useLocation()
    const navs = [
        {
            name: "Home",
            path : "/"
        },
        {
            name: "Cart",
            path : "/cart",
        }
    ]

    return (
        <div className="w-full p-4 flex justify-between border-b border-gray-200">
            <NavLink to="/"><h3 className="flex-1 font-bold text-lg">ProCommerce</h3></NavLink>
            <CartIcon/>
            <div className="flex gap-4 items-center px-4">
                {navs.map((nav) => (
                    <NavLink key={nav.name} className={`${nav.path === path.pathname && "font-bold"}`} to={nav.path}>{nav.name}</NavLink>
                ))}
            </div>
            <UserDropdown/>
        </div>
    )
}