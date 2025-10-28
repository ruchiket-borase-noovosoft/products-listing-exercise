import ArrowBottom from "./interactive/icons/ArrowBottom.tsx";
import {useCallback, useState} from "react";
import useFetch from "../utils/hooks/useFetch.ts";
import {API} from "../utils/api.ts";
import type {UserType} from "../utils/types/user.ts";
import {useStore} from "../utils/store.ts";
import UserCard from "./Usercard.tsx";


export default function UserDropdown ({handleUserSelect}: { handleUserSelect:(user: UserType) => Promise<void> }){
    const [show, setShow] = useState(false);
    const {loading, data:users} = useFetch(["users", "all"], useCallback(API.users.list,[]),{
        select: (data: {users?: UserType[]}) => {
            return data?.users
        }
    });
    const {user} = useStore();

    async function onUserSelect(user:UserType){
        try{
            await handleUserSelect(user)
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
            {user.firstName && <div onClick={() => setShow(prev => !prev)}
                  className="z-20 flex items-center gap-2 text-sm cursor-pointer">
                <img alt={user.firstName} src={user.image} className="w-8 rounded-full border border-gray-300"/>
                <h1 className="text-sm">{`${user.id}. ${user.firstName} ${user.lastName}`}</h1>
                <ArrowBottom className={`${show && 'rotate-180'} transition-all`}/>
            </div>}
        <div className={`absolute z-50 flex flex-col z-10 ${!show ? "translate-x-10 invisible opacity-0 pointer-events-none" : "visible -translate-x-8"} transition-all top-14 w-full min-w-[144px] h-[300px] max-h-[300px] overflow-y-scroll rounded-md bg-white shadow-sm`}>
            {
                users && !loading && users.map((u:UserType) =>(
                    <UserCard onClick={onUserSelect}
                              user={u} className={`${user.id === u.id && "bg-gray-200" }`} key={u.id}/>
                ))
            }
        </div>
        </div>
    )
}
