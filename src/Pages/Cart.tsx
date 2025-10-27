import Search from "../components/Search.tsx";
import CategorySelector from "../components/CategorySelector.tsx";
import {NavLink} from "react-router-dom";
import { useContext} from "react";
import {StoreDispatchProvider, StoreProvider} from "../utils/store.ts";
import type {ProductType} from "../utils/types/product.ts";
import ProductCard from "../components/ProductCard.tsx";
import {API} from "../utils/api.ts";
import ArrowLeft from "../components/interactive/icons/ArrowLeft.tsx";
import useCart from "../utils/hooks/useCart.tsx";

export default function Cart(){
    const {cart} = useContext(StoreProvider)
    const {handleCart, isProductInCart} = useCart()

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