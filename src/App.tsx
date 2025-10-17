import {useState, useCallback} from "react";
import useFetchProducts from "./utils/hooks/useFetchProducts.ts";
import type {CATEGORIES as CategoryType} from "./utils/constants.ts";
import {CATEGORIES} from "./utils/constants.ts";
import Search from "./components/Search.tsx";
import ProductCard from "./components/ProductCard.tsx";
import CategorySelector from "./components/CategorySelector.tsx";

function App() {
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<CategoryType>(CATEGORIES.ALL);

    const {products, loading, error} = useFetchProducts(search, category)
    const onSearch = useCallback(function onSearch (value){
        setSearch(value)
    },[]);

    return (
    <div className="w-full h-full md:w-[80%] mx-auto">
        <div className="w-full p-4 flex items-center justify-center border-b border-gray-200">
            <h3 className="font-bold text-lg">ProCommerce</h3>
        </div>
        <div className="flex items-center gap-4 p-4 w-full bg-gray-100 justify-center">
            <Search handleSearch={onSearch}/>
               <CategorySelector
               category={category as any}
               handleSelect={(value) => setCategory(value as any)}
               />
        </div>
        <div className="flex gap-4 w-full flex-wrap p-4">
            {products?.map((product)=> (
                <ProductCard product={product} />
            ))}
        </div>

    </div>
  )
}

export default App