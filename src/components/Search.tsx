import {FC, memo, useEffect, useState} from "react";

type SearchPropType = {
    handleSearch: (value: string) => void
}

 export default memo(function SearchBox ({handleSearch}: SearchPropType){
    const [inputValue, setInputValue] = useState("");
    console.log("rerendered")
    useEffect(() => {
        const timeout = setTimeout(() => {
            handleSearch(inputValue)
        },1000)
        return () => clearTimeout(timeout)
    },[inputValue]);

    return (
        <div>
            <input
                className="outline-none w-full h-full border border-gray-500 px-3 py-2 rounded-md"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="search"/>
        </div>
    )
} as FC<SearchPropType>)
