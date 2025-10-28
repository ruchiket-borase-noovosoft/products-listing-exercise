import {CATEGORIES} from "../constants.ts";
import {API} from "../api.ts";
import useFetch from "./useFetch.ts";
import type {ProductType} from "../types/product.ts";
import type {FiltersType} from "../types/misc.ts";

export default function useProducts (filters: FiltersType) {
    const {search, category, current} = filters;

    const {data:products, loading, error} = useFetch<ProductType>(
        ["all", "products", search, category], () => {
            if(!current && !search && category === CATEGORIES.ALL){
                 return API.products.list()
            }
           else  if(current === "category"|| search === ""){
                return API.products.filter(category)
            }
                return  API.products.search(search)
        },{
            select: (result: {products? : ProductType[]}) => {
                if(!result) return;
                const list: ProductType[] = result?.products
                const isSearching = current === "search";

                // category over search
                if(isSearching && category !== CATEGORIES.ALL){
                    const filterList = list.filter((product) => product.category === category)
                    return filterList || []
                }

                // search over category
                else if(!isSearching && search !== "" && category !== CATEGORIES.ALL){
                    // search algo
                    const items =  list.filter((product) => {
                        return product.title.toLowerCase().includes(search.toLowerCase())
                    })
                    return items || []
                }
                else return list;
            }
        }
    );

    return {products, loading, error}
}