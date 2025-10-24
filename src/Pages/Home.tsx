import {useCallback, useContext, useState} from "react";
import useFetchProducts from "../utils/hooks/useFetchProducts.ts";
import type {CATEGORIES as CategoryType} from "../utils/constants.ts";
import {CATEGORIES} from "../utils/constants.ts";
import Search from "../components/Search.tsx";
import ProductCard from "../components/ProductCard.tsx";
import CategorySelector from "../components/CategorySelector.tsx";
import {StoreDispatchProvider, StoreProvider} from "../utils/store.ts";
import type {ProductType} from "../utils/types/product.ts";
import {API} from "../utils/api.ts";

function Home() {
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<CategoryType>(CATEGORIES.ALL);

    const {products, loading} = useFetchProducts(search, category)
    const onSearch = useCallback(function onSearch (value: string){
        setSearch(value);
    },[]);

    const dispatchStore = useContext(StoreDispatchProvider);
    const {user, cart} = useContext(StoreProvider)

    async function handleCart(product:Partial<ProductType>, isInCart: boolean){
        try{
            const [url, method] = API.cart.update();
            let payload;
            if(isInCart){
                // remove from cart logic
                payload = cart.filter((item) => item.id !== product.id);
            }else{
                //add to cart
                payload = [product];
            }
            // request to api
            const response = await fetch(url, {
                method,
                body: JSON.stringify({
                    userId: user.id,
                    merge: !isInCart,
                    products: payload
                })
            })
            const data = await response.json()
            if(data){
                if(isInCart){
                    dispatchStore({type: "remove_from_cart", payload: {id:product.id}})
                }else dispatchStore({type: "add_to_cart", payload: product});
            }

        }
        catch(err) {
            console.log(err)
        }
    }

    function isProductInCart(id: number){
        const isInCart = cart?.find((product) => product.id === id)
        return !!isInCart;
    }

    return (
        <>
            <div className="flex items-center gap-4 p-4 w-full bg-gray-100 justify-center">
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
                    <ProductCard isInCart={isProductInCart(product.id)}
                                 handleCart={handleCart}
                                 product={product}/>
                ))}
            </div>
        </>
    )
}

export default Home;