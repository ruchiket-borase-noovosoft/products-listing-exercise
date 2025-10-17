import {useState, useCallback} from "react";
import useFetchProducts from "./utils/hooks/useFetchProducts.ts";
import type {CATEGORIES as CategoryType} from "./utils/constants.ts";
import {CATEGORIES} from "./utils/constants.ts";
import Search from "./components/Search.tsx";
import ProductCard from "./components/ProductCard.tsx";

function App() {
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<CategoryType>(CATEGORIES.ALL);

    const {products, loading, error} = useFetchProducts(search, category)


  //
  //   useEffect(() => {
  //       fetch('https://dummyjson.com/products/category-list')
  //           .then(res => res.json())
  //           .then(setCategories);
  //   },[]);
  //
  //   useEffect(() => {
  //       fetch('https://dummyjson.com/products')
  //           .then(res => res.json()).then((data) => setProducts(data.products));
  //
  //       console.log(products)
  //   },[]);
  //
  //   useEffect(() => {
  //       filters?.category && setProducts(prev => handleFilter(prev, filters.category))
  //   },[filters]);
  //
  //   useEffect(() => {
  //       if(products && !search) return;
  //       fetch(`https://dummyjson.com/products/search?q=${search}`)
  //           .then(res => res.json())
  //           .then((data) => {setProducts(handleFilter(data.products, filters?.category))
  //           });
  //   },[search,filters]);
  //
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
                <select className="py-2 px-4 bg-white rounded-md outline-none focus:ring ring-gray-500 border border-gray-300 transition-all" value={category as string} onChange={(e)=>{
                    setCategory(()=>(e.target.value as CategoryType))
                }}>
                    {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map((key) => (
                        <option>{CATEGORIES[key].toUpperCase()}</option>
                    ))}
                </select>
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

//search changes -> filter apply to the new products
//filters changes -> search products should be applied with new category
