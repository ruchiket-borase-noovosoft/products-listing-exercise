import type {UserType} from "../components/UserDropdown.tsx";
import {createContext, useContext} from "react";

export interface StoreType {
    value: {   user: Partial<UserType>,
        cart: any[]}, handler: () => void
}

const initialStore = {
    user: {
        id: 1
    },
    cart : []
}

export const StoreProvider  = createContext<StoreType>({value: initialStore, handler: () => {}})