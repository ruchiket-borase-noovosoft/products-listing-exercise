import {useCallback, useState} from "react";
import useProducts from "../utils/hooks/useProducts.ts";
import {CATEGORIES} from "../utils/constants.ts";
import Search from "../components/Search.tsx";
import ProductCard from "../components/ProductCard.tsx";
import CategorySelector from "../components/CategorySelector.tsx";
import useCart from "../utils/hooks/useCart.ts";
import type {FiltersType} from "../utils/types/misc.ts";

function Home() {
    const {handleCart, isProductInCart} = useCart();
    const [filters, setFilters] = useState<FiltersType>({search:"", category: CATEGORIES.ALL, current:null})
    const {products, loading} = useProducts(filters)

    const onSearch = useCallback(function onSearch (value: string){
        setFilters((prev) => ({...prev, search: value, current: "search"}))
    },[]);

    const onCategorySelect = useCallback((value: CATEGORIES) => {
        setFilters((prev) => ({...prev, category: value, current: "category"}))
    },[])

    return (
        <>
            <div className="flex flex-wrap sm:flex-nowrap items-streatch gap-4 p-4 w-full bg-gray-100 justify-center">
                <Search handleSearch={onSearch}/>
                <CategorySelector
                    category={filters.category as CATEGORIES}
                    handleSelect={onCategorySelect}
                />
            </div>
            <div className="flex mx-auto gap-4 w-full flex-wrap p-4">
                {loading ? <div>
                    <div role="status" className="flex gap-4 w-full mx-auto max-w-full flex-wrap animate-pulse">
                        {Array(8).fill(0).map((_,index) => <div key={index} className="h-[22rem] w-64 bg-gray-200 rounded-sm"></div>)}
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> : products?.map((product) => (
                    <ProductCard key={product.id} isInCart={isProductInCart(product.id)}
                                 handleCart={handleCart}
                                 product={product}/>
                ))}
            </div>
        </>
    )
}

export default Home;