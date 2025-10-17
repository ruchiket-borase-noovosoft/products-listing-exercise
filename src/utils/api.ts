import type {CATEGORIES} from "./constants.ts";

type APIMethodType = "GET" | "POST" | "DELETE";

type RequestType = [string, APIMethodType]

const baseURL = 'https://dummyjson.com';
function request<RequestType>(endpoint: string,  method: APIMethodType){
    return [`${baseURL}/${endpoint}`, method]
}

export const API = {
    products: {
        list: () => {
            request(`products`, "GET")
        },
        search: (param: string) => {
            request(`products/search?q=${param}`, "GET")
        },
        filter: (category: CATEGORIES) => {
            request(`products/category/${category}`, "GET")
        }
    },
}