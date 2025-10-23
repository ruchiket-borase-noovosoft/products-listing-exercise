import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import {useReducer} from "react";
import type {UserType} from "../components/UserDropdown.tsx";
import type {StoreType} from "./store.ts";

type StoreReducerType = {
    type: "add_to_cart" | "remove_from_cart" | "add_user" | "change_user",
    payload?: Partial<UserType | any>
}

const storeReducer = (store: StoreType, action: StoreReducerType) => {
    switch (action.type){
        case "add_to_cart" :
            const cart = [...store.value.cart, action.payload];
            return {value: {...store.value, cart: newCart}}
        case "remove_from_cart" :
            const newCart = store.value.cart.filter((item) => item.id !== action.payload.id);
            return {value: {...store.value, cart: newCart}}
        case "add_user":
            return {value: {...store.value, user: action.payload, cart: []}}
    }
}

export default function Providers({children}: {children: React.ReactElement}){
    // store with user & cart
    const initialStore = {
        user: {
            id: 1
        },
        cart: [],
        dispatch:
    }
    const [store, dispatchStore] = useReducer(storeReducer, initialStore);

    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
}