import { memo} from "react";
import type {FC} from "react";
import type {CATEGORIES as CategoryType} from "../utils/constants.ts";
import {CATEGORIES} from "../utils/constants.ts";

type handleSelectCategoryPropType = {
    category: CategoryType,
    handleSelect: (value: CategoryType) => void
}

export default memo(function CategorySelector ({handleSelect, category}: handleSelectCategoryPropType){

    return (
        <select className="py-2 px-4 bg-white rounded-md outline-none focus:ring ring-gray-500 border border-gray-300 transition-all"
                value={category as string}
                onChange={(e)=>{
            handleSelect(e.target.value as CategoryType)
        }}>
            {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map((key) => (
                <option key={key}>{CATEGORIES[key]}</option>
            ))}
        </select>
    )
} as FC<handleSelectCategoryPropType>)
