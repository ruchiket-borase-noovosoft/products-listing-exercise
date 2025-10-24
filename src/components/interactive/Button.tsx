import type {ButtonHTMLAttributes} from "react";
import Flower from "./icons/Flower.tsx";

export default function Button ({variant =  "primary", loading, className, children, ...props} : ButtonHTMLAttributes<HTMLButtonElement> & {variant: "primary" | "outline", loading: boolean}){

    let styles = ""
    switch (variant){
        case "primary":
             styles = 'bg-black text-white'
            break;
        case "outline" :
             styles = 'bg-white text-black border-2 border-black hover:bg-gray-200'
            break;
    }
    return(
        <button className={`outline-none flex items-center justify-center min-w-[84px] text-sm rounded-full outline-none font-medium transition-all py-2 px-3 ${styles} ${className}`} {...props}>
            {loading ? <Flower fill={variant === "outline" && "black"} className="animate-spin" /> : children}
        </button>
    )
}