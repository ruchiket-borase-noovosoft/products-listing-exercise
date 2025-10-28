import {NavLink} from "react-router-dom";
import {useStore} from "../utils/store.ts";
import type {ProductType} from "../utils/types/product.ts";
import ProductCard from "../components/ProductCard.tsx";
import ArrowLeft from "../components/interactive/icons/ArrowLeft.tsx";
import useCart from "../utils/hooks/useCart.ts";

export default function Cart(){
    const {cart} = useStore();
    const {handleCart, isProductInCart} = useCart()

    return(
        <div className="min-h-screen">
            <div className="flex items-center gap-4 p-4 w-full bg-gray-100">
                <NavLink to="/"><ArrowLeft/></NavLink>
            </div>
            <div className="p-4">
            <h1 className="p-4 text-xs">
                <span className="font-bold text-sm">{cart?.products?.length || 0}</span> Total Items
            </h1>
                <div className="flex gap-5 flex-wrap">
            {
                cart?.products?.map((product:ProductType) => (
                    <ProductCard key={product.title + product.id} product={product} isInCart={isProductInCart(product.id)} handleCart={handleCart}/>
                ))
            }</div>
            </div>
        </div>
    )
}