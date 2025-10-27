import type {ProductType} from "../types/product.ts";
import {useContext} from "react";
import {StoreDispatchProvider, StoreProvider} from "../store.ts";

export default function useCart () {
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

    return [handleCart, isProductInCart]
}