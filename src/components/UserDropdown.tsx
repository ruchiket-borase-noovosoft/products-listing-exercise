import ArrowBottom from "./interactive/icons/ArrowBottom.tsx";
import {useEffect, useState} from "react";
import useFetch from "../utils/hooks/useFetch.ts";
import {API} from "../utils/api.ts";

export interface UserType {
    id:number,
    image: string,
    firstName: string,
    lastName: string,
    role: string,
    email:string
}

export default function UserDropdown (){
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(false);
    const [users, setUsers] = useState<UserType>()
    const {loading, data} = useFetch(API.users.list());

    useEffect(() => {
        if(data?.users){
            setUsers(data.users)
        }
    },[data])

    // add infinite load to users

    return (
        <div className="relative">
            <div onClick={() => setShow(prev => !prev)} className="z-20 flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-full aspect-square bg-red-500"></div>
            Ruchiket
            <ArrowBottom className={`${show && 'rotate-180'} transition-all`}/>
        </div>
        <div className={`absolute flex flex-col z-10 ${!show ? "translate-x-10 invisible opacity-0 pointer-events-none" : "visible translate-0"} transition-all top-14 w-full min-w-[144px] h-[300px] max-h-[300px] overflow-y-scroll rounded-md bg-white shadow-sm`}>
            {
                users && !loading && users.map((user:UserType) =>(
                    <UserCard user={user} key={user.id}/>
                ))
            }
        </div>
        </div>
    )
}

function UserCard ({user}: { user:UserType }) {
    return (
        <div  className="z-20 flex items-center gap-2 text-xs hover:bg-gray-100 p-4 py-3 cursor-pointer">
            <img src={user.image} className="w-8 rounded-full border border-gray-300" />
            {`${user.firstName} ${user.lastName}`}
    </div>
    )
}