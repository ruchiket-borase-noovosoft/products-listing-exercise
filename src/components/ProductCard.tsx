export default function ProductCard ({product} : {product: ProductType}) {
    const discountedPrice = Math.round(product.discountPercentage) === 0 ? product.discountPercentage :  product.discountPercentage * product.price / 100 ;
    return(
        <div className="relative flex flex-col group gap-2 cursor-pointer items-center p-4 shadow-sm rounded-2xl md:max-w-[280px]">
            <img className="object-cover group-hover:scale-[1.1] transition-all w-60" src={product.thumbnail}/>
            <div className="flex flex-col items-center justify-between h-[140px]">
            <div >
                <h1 className="text-lg font-bold">{product.title}</h1>
                <span className="text-sm text-gray-500">{product.description.slice(0,50)}</span>
            </div>
            <div className="w-full w-full flex items-center justify-between ">
                <div><h1  className={`text-xl font-bold`}>${discountedPrice.toFixed(2)} <span className="text-[10px] text-red-500 pl-1">{product.discountPercentage}% OFF</span></h1>
                    <p className="line-through text-xs text-gray-600">{product.price}</p>
                </div>
                <button className="bg-black hover:bg-gray-900 text-white text-xs font-medium rounded-full py-2 px-3 transition-all">
                    Add To Cart
                </button>
            </div>
            </div>
        </div>
    )
}