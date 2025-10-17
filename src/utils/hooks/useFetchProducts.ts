import {CATEGORIES} from "../constants.ts";
import {useEffect, useState} from "react";
import type {RequestType} from "../api.ts";
import {API} from "../api.ts";
import useFetch from "./useFetch.ts";
import type {ProductType} from "../types/product.ts";

export default function useFetchProducts (search: string, category: CATEGORIES) {
    const [products, setProducts] = useState<ProductType[]>([])
    const [URL, setURL] = useState<RequestType>(["", "GET"]);
    const {data, loading, error} = useFetch<any>(URL, [URL]);

    useEffect(() => {
        if(!data) return;
        const list: ProductType[] = data?.products
        const isSearching = URL?.[0].includes("search")

        // category over search
        if(isSearching && category !== CATEGORIES.ALL){
            const filterList = list.filter((product) => product.category === category)
            return setProducts( filterList || [])
        }

        // search over category
        else if(!isSearching && search !== "" && category !== CATEGORIES.ALL){
            // search algo
           const items =  list.filter((product) => {
                product.title.includes(search)
            })
            return setProducts(items || [])
        }
        setProducts(list);

    },[data, search, category]);

    useEffect(() => {
        if(!search && category === CATEGORIES.ALL){
            setURL(API.products.list())
        }
    }, [search, category]);

    // effect for search
    useEffect(() => {
        if(!search) return;
        const requestUrl = API.products.search(search)
        setURL(requestUrl)
    }, [search]);

    // effect for category
    useEffect(() => {
        if(category === CATEGORIES.ALL) return;
        const requestUrl = API.products.filter(category)
        setURL(requestUrl)
    }, [category]);

    return {products, loading, error}
}