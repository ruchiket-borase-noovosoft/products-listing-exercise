import Search from "../components/Search.tsx";
import CategorySelector from "../components/CategorySelector.tsx";
import {NavLink} from "react-router-dom";

export default function Cart(){
    return(
        <div>
            <div className="flex items-center gap-4 p-4 w-full bg-gray-100">
                <NavLink to="/">Back</NavLink>
            </div>
            <h1 className="p-4 text-sm">
                <span className="font-bold">20</span> Items listed in Cart
            </h1>
        </div>
    )
}