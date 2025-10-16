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
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="search"/>
        </div>
    )
} as FC<SearchPropType>)
