import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import {useEffect, useReducer} from "react";
import type {StoreType} from "./store.ts";
import {StoreDispatchProvider, StoreProvider} from "./store.ts";
import useFetch from "./hooks/useFetch.ts";
import {API} from "./api.ts";
import type {UserType} from "./types/user.ts";

export type StoreReducerType = {
    type: "add_to_cart" | "remove_from_cart" | "add_user" | "change_user" | "cart_init",
    payload?: Partial<UserType | any>
}

const storeReducer = (store: StoreType, action: StoreReducerType) => {
    switch (action.type){
        case "add_to_cart" :
            const cart = [...store.cart, action.payload];
            return {...store, cart: cart}
        case "remove_from_cart" :
            const newCart = store.cart.filter((item) => item.id !== action.payload.id);
            return {...store, cart: newCart}
        case "add_user":
            return {user: action.payload, cart: []}
        case "cart_init":
            return {...store , cart: action.payload}
    }
}

export default function Providers({children}: {children: React.ReactElement}){
    // store with user & cart
    const initialStore = {
        user: {
            id: 1
        },
        cart: []
    }
    const [store, dispatchStore] = useReducer<StoreType>(storeReducer as StoreReducerType, initialStore);
    const {data:user} = useFetch(API.users.get(store.user.id || 1));
    const {data:cart} = useFetch(API.cart.get(store.user.id || 1));


    useEffect(() => {
        if(user){
            dispatchStore({type: "add_user", payload: user} as any)
        }
    }, [user])

    useEffect(() => {
        if(cart){
            dispatchStore({type: "cart_init", payload: cart.carts} as any)
        }
    }, [cart]);

    return (
        <BrowserRouter>
            <StoreProvider value={store}>
                <StoreDispatchProvider value={dispatchStore}>
                    {children}
                </StoreDispatchProvider>
            </StoreProvider>
        </BrowserRouter>
    )
}