import {createContext, useContext} from "react";
import type {UserType} from "./types/user.ts";
import type {CartType} from "./types/cart.ts";

export interface StoreType {
     user: UserType, cart: CartType
}

export const StoreProvider  = createContext<StoreType>(null)

export const StoreDispatchProvider = createContext<(action: StoreReducerType) => void>(null);

export const useStore = () => {
     const store = useContext(StoreProvider)

     return {user: store?.user, cart: store?.cart}
}

export const useStoreDispatch = () => {
     return useContext(StoreDispatchProvider)
}

export type StoreReducerType = {
     type: "add_to_cart" | "remove_from_cart" | "set_user" | "change_user" | "set_cart",
     payload?: Partial<UserType> | Partial<CartType> | unknown
}

export const storeReducer = (prevState: StoreType, action: StoreReducerType):StoreType => {
     const store = prevState;
     switch (action.type){
          case "add_to_cart" :
               const cart = {...store.cart, products: [...(store.cart?.products || []), action.payload]}
               return {...store, cart: cart} as StoreType
          case "remove_from_cart" :
               const filterProducts = store.cart.products.filter((item) => item.id !== (action.payload as UserType).id);
               return {...store, cart: {...store.cart, products: filterProducts}}
          case "set_user":
               return {user: action.payload, cart: {id: 1, userId: (action.payload as UserType)?.id}} as StoreType
          case "set_cart":
               action.payload
               return {...store , cart: action.payload|| {id: 1, userId: (action?.payload as CartType)?.userId}} as StoreType
     }
}

export const initialStore = {
     user: {
          id: 1
     },
     cart: {id:1, products: []}
}