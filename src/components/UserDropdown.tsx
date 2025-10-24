import ArrowBottom from "./interactive/icons/ArrowBottom.tsx";
import {useContext, useEffect, useState} from "react";
import useFetch from "../utils/hooks/useFetch.ts";
import {API} from "../utils/api.ts";
import type {UserType} from "../utils/types/user.ts";
import {StoreDispatchProvider, StoreProvider} from "../utils/store.ts";


export default function UserDropdown (){
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState<UserType[]>()
    const {loading, data} = useFetch(API.users.list());
    const {user} = useContext(StoreProvider);
    const storeDispatch = useContext(StoreDispatchProvider);

    useEffect(() => {
        if((data as { users: UserType[] })?.users){
            setUsers((data as { users: UserType[] }).users)
        }
    },[data]);

    async function onUserSelect(user:UserType){
        try{
            storeDispatch({type: "add_user", payload: user});
            const [url] = API.cart.get(user.id)
            const cartData = await fetch(url);
            const cart = await cartData.json();
            storeDispatch({type: "cart_init", payload: cart?.carts});
        }
        catch(e){
            console.error(e)
        }finally {
            setShow(false)
        }
    }

    // WIP: add infinite load to users

    return (
        <div className="relative">
            <div onClick={() => setShow(prev => !prev)} className="z-20 flex items-center gap-2 text-sm cursor-pointer">
                <img src={user.image} className="w-8 rounded-full border border-gray-300" />
                {user.firstName}
            <ArrowBottom className={`${show && 'rotate-180'} transition-all`}/>
        </div>
        <div className={`absolute z-50 flex flex-col z-10 ${!show ? "translate-x-10 invisible opacity-0 pointer-events-none" : "visible -translate-x-8"} transition-all top-14 w-full min-w-[144px] h-[300px] max-h-[300px] overflow-y-scroll rounded-md bg-white shadow-sm`}>
            {
                users && !loading && users.map((u:UserType) =>(
                    <UserCard onClick={(us:UserType) => onUserSelect(us) }
                              user={u} className={`${user.id === u.id && "bg-gray-200" }`} key={u.id}/>
                ))
            }
        </div>
        </div>
    )
}

function UserCard({user, className, onClick}: {
    user: UserType,
    className?: string,
    onClick?: (user: UserType) => void,
}) {
    return (
        <div onClick={() => onClick(user)} className={`z-20 flex items-center gap-2 text-xs hover:bg-gray-100 p-4 py-3 cursor-pointer ${className}`}>
            <img src={user.image} className="w-8 rounded-full border border-gray-300" />
            {`${user.firstName} ${user.lastName}`}
    </div>
    )
}