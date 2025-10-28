import type {ProductType} from "./product.ts";

export interface CartType {
    id: number,
    products: ProductType[],
    userId: number
}