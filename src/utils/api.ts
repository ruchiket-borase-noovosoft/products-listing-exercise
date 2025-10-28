import type {CATEGORIES} from "./constants.ts";

type APIMethodType = "GET" | "POST" | "DELETE" | "PUT";

export type RequestType = [string, APIMethodType]

const baseURL = 'https://dummyjson.com';

async function request<T>(endpoint: string,  method: APIMethodType, payload: {headers?: Record<string|number|symbol, unknown>, body?:Record<string|number|symbol, unknown>} = {}){
    const url = `${baseURL}/${endpoint}`;

    const options = {
        method,
        headers: {
            ...payload?.headers,
            'Content-Type' : 'application/json'
        },
    ...(method !== "GET" && {body: JSON.stringify( payload?.body)})
    }

    try{
        const response = await fetch(url, options as RequestInit)
        return await response.json() as T;
    }catch(err){
        console.error(err)
        throw err;
    }
}

export const API = {
    products: {
        list: () => (
            request(`products`, "GET"))
        ,
        search: (param: string) =>(
            request(`products/search?q=${param}`, "GET")
        ),
        filter: (category: CATEGORIES) => (
            request(`products/category/${category}`, "GET")
        )
    },
    users: {
        list: () => (
            request(`users`, "GET")
        ),
        get: (id: string | number) => (
            request(`users/${id}`, "GET")
        )
    },
    cart: {
        get: (id: string | number) => (
            request(`carts/user/${id}`, "GET")
        ),
        update: (body:  Record<string | number | symbol, unknown> = {}) => (
            request(`carts/1`, "PUT", {body})
        )
    }
}