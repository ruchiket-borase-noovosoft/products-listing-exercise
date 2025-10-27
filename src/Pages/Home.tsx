import {useCallback, useContext, useState} from "react";
import useFetchProducts from "../utils/hooks/useFetchProducts.ts";
import type {CATEGORIES as CategoryType} from "../utils/constants.ts";
import {CATEGORIES} from "../utils/constants.ts";
import Search from "../components/Search.tsx";
import ProductCard from "../components/ProductCard.tsx";
import CategorySelector from "../components/CategorySelector.tsx";
import useCart from "../utils/hooks/useCart.tsx";

function Home() {
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<CategoryType>(CATEGORIES.ALL);
    const {handleCart, isProductInCart} = useCart();
    const {products, loading} = useFetchProducts(search, category)

    const onSearch = useCallback(function onSearch (value: string){
        setSearch(value);
    },[]);

    return (
        <>
            <div className="flex flex-wrap sm:flex-nowrap items-streatch gap-4 p-4 w-full bg-gray-100 justify-center">
                <Search handleSearch={onSearch}/>
                <CategorySelector
                    category={category as any}
                    handleSelect={(value) => setCategory(value as any)}
                />
            </div>
            <div className="flex mx-auto gap-4 w-full flex-wrap p-4">
                {loading ? <div>
                    <div role="status" className="flex gap-4 w-full mx-auto max-w-full flex-wrap animate-pulse">
                        {Array(8).fill(0).map((_,index) => <div key={index} className="h-[22rem] w-[17rem] bg-gray-200 rounded-sm"></div>)}
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