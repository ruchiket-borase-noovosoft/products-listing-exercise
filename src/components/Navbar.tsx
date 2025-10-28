import {NavLink, useLocation} from "react-router-dom";
import UserDropdown from "./UserDropdown.tsx";
import CartIcon from "./interactive/icons/CartIcon.tsx";
import {useStore, useStoreDispatch} from "../utils/store.ts";
import ShopIcon from "./interactive/icons/ShopIcon.tsx";
import type {UserType} from "../utils/types/user.ts";
import {API} from "../utils/api.ts";
import type {CartType} from "../utils/types/cart.ts";

export default function Navbar () {
    const {cart} = useStore();
    const dispatchStore = useStoreDispatch()
    const path = useLocation()
    const navs = [
        {
            name: <ShopIcon/>,
            path : "/"
        },
        {
            name: <CartIcon/>,
            path : "/cart",
            count: cart?.products?.length || 0
        }
    ]

    // user dropdown logic
    async function handleUserSelect(user:UserType){
            try{
                dispatchStore({type: "set_user", payload: user});
                const cart = await API.cart.get(user.id) as {carts?: CartType[]};
                dispatchStore({type: "set_cart", payload: {...cart?.carts[0], userId:user.id}});
            }catch(e) {
                console.error(e)
            }
    }

    return (
        <div className="w-full sticky top-0 backdrop-blur-md bg-white/30 z-50 p-4 flex justify-between items-center border-b border-gray-200">
            <NavLink to="/"><h3 className="flex-1 font-bold text-sm md:text-lg">ProCommerce</h3></NavLink>
            <div className="flex gap-6 items-center">
                <div className="flex gap-3 items-center">
                {navs.map((nav,i) => (
                    <NavLink key={i} className={`relative p-1 rounded-lg ${nav.path === path.pathname && " bg-gray-100/30 border border-gray-200 font-bold"}`} to={nav.path}>{nav.name}
                        {nav?.count > 0 && <span className="absolute bg-yellow-500 aspect-square w-4 text-center -top-2 -right-2 text-xs rounded-full">{nav?.count}</span>}
                    </NavLink>
                ))}
                </div>
                <UserDropdown handleUserSelect={handleUserSelect}/>
            </div>

        </div>
    )
}