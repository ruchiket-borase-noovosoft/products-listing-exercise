import {FC, memo, useEffect, useState} from "react";

type SearchPropType = {
    handleSearch: (value: string) => void
}

 export default memo(function SearchBox ({handleSearch}: SearchPropType){
    const [inputValue, setInputValue] = useState("");
    useEffect(() => {
        const timeout = setTimeout(() => {
            handleSearch(inputValue)
        },1000)
        return () => clearTimeout(timeout)
    },[inputValue]);

    return (
            <input
                className="outline-none max-w-[568px] bg-white w-full h-full border border-gray-300 focus:ring focus:ring-gray-500 px-3 py-2 rounded-md transition-all"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="search"/>
    )
} as FC<SearchPropType>)
