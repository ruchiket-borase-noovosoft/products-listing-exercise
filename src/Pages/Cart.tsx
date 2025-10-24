import Search from "../components/Search.tsx";
import CategorySelector from "../components/CategorySelector.tsx";
import {NavLink} from "react-router-dom";
import { useContext} from "react";
import {StoreDispatchProvider, StoreProvider} from "../utils/store.ts";
import type {ProductType} from "../utils/types/product.ts";
import ProductCard from "../components/ProductCard.tsx";
import {API} from "../utils/api.ts";
import ArrowLeft from "../components/interactive/icons/ArrowLeft.tsx";

export default function Cart(){
    const dispatchStore = useContext(StoreDispatchProvider)
    const {user, cart} =  useContext(StoreProvider);

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
                    console.log(product)
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

    return(
        <div className="min-h-screen">
            <div className="flex items-center gap-4 p-4 w-full bg-gray-100">
                <NavLink to="/"><ArrowLeft/></NavLink>
            </div>
            <div className="p-4">
            <h1 className="p-4 text-xs">
                <span className="font-bold text-sm">{cart?.length || 0}</span> Total Items
            </h1>
                <div className="flex gap-5 flex-wrap">
            {
                cart?.map((product:ProductType) => (
                    <ProductCard key={product.title + product.id} product={product} isInCart={isProductInCart(product.id)} handleCart={handleCart}/>
                ))
            }</div>
            </div>
        </div>
    )
}