import {createContext} from "react";
import type {StoreReducerType} from "./Providers.tsx";
import type {UserType} from "./types/user.ts";

export interface StoreType {
     user: UserType, cart: any[]
}

const initialStore = {
    user: {
        id: 1
    },
    cart : []
}

export const StoreProvider  = createContext<StoreType>({value: initialStore})

export const StoreDispatchProvider = createContext<(store: StoreType, action: StoreReducerType) =>void>(null)