import type {ProductType} from "../types/product.ts";
import {useStore, useStoreDispatch} from "../store.ts";
import {API} from "../api.ts";


export default function useCart () {
    const dispatchStore = useStoreDispatch()
    const {user,cart} = useStore()

    async function handleCart(product:Partial<ProductType>){
        const isInCart = isProductInCart(product.id);
        try{
            let payload = {id:cart.id, userId: user.id, products:[]};
            if(isInCart){
                // remove from cart logic
                payload.products = cart.products.filter((item) => item.id !== product.id) || [];
            }else{
                //add to cart
                payload.products = [product];
            }
            // request to api
           const data = await API.cart.update(payload.id,{
                userId: user.id,
                merge: !isInCart,
                products: payload.products
            } as Record<string | number | symbol, unknown>)
            if(data){
                if(isInCart){
                    dispatchStore({type: "remove_from_cart", payload: {id:product.id}})
                }else dispatchStore({type: "add_to_cart", payload: product});
            }

        }
        catch(err) {
            console.error(err)
        }
    }

    function isProductInCart(id: number){
        const isInCart = cart?.products?.find((product) => product.id === id)
        return !!isInCart;
    }

    return {handleCart, isProductInCart}
}