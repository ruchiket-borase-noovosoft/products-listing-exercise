import {createContext} from "react";
import type {StoreReducerType} from "./Providers.tsx";
import type {UserType} from "./types/user.ts";
import type {ProductType} from "./types/product.ts";

export interface StoreType {
     user: UserType, cart: any[]
}

export const StoreProvider  = createContext<{user: UserType, cart: ProductType[]}>(null)

export const StoreDispatchProvider = createContext<(action: StoreReducerType) => void>(null)