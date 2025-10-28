import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import {useCallback, useReducer} from "react";
import type {StoreType} from "./store.ts";
import {initialStore, StoreDispatchProvider, StoreProvider, storeReducer} from "./store.ts";
import useFetch from "./hooks/useFetch.ts";
import {API} from "./api.ts";
import type {UserType} from "./types/user.ts";
import type {CartType} from "./types/cart.ts";

export default function Providers({children}: {children: React.ReactElement}){
    const [store, dispatchStore] = useReducer(storeReducer, initialStore);

    const user = useFetch([], useCallback(() => {
        return API.users.get(store.user.id)
    },[]),{
        onSuccess: (result) => {
            if(result as UserType){
                dispatchStore({type: "set_user", payload: result})
            }
    }
    });

    const cart = useFetch([], useCallback(() => {
        return API.cart.get(store.user.id)
    },[]),{
        onSuccess: (result) => {
            if(result){
                dispatchStore({type: "set_cart",
                    payload: (result as {carts?: CartType}).carts[0] || {userId: store.user.id}
                })
            }
        }
    });

    return (
        <BrowserRouter>
            <StoreProvider value={store as StoreType}>
                <StoreDispatchProvider value={dispatchStore}>
                    {children}
                </StoreDispatchProvider>
            </StoreProvider>
        </BrowserRouter>
    )
}