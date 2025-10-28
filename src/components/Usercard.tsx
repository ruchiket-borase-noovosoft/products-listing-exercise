import type {UserType} from "../utils/types/user.ts";

export default function UserCard({user, className, onClick}: {
    user: UserType,
    className?: string,
    onClick?: (user: UserType) => void,
}) {
    return (
        <div onClick={() => onClick(user)} className={`z-20 flex items-center gap-2 text-xs hover:bg-gray-100 p-4 py-3 cursor-pointer ${className}`}>
            <img alt={user.firstName} src={user.image} className="w-8 rounded-full border border-gray-300" />
            {`${user.id}. ${user.firstName} ${user.lastName}`}
        </div>
    )
}