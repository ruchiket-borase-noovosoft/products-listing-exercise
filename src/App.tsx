import {useState, useCallback} from "react";
import useFetchProducts from "./utils/hooks/useFetchProducts.ts";
import type {CATEGORIES as CategoryType} from "./utils/constants.ts";
import {CATEGORIES} from "./utils/constants.ts";
import Search from "./components/Search.tsx";

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
    <div>
        <div className="flex items-center gap-4 p-4">
            <Search handleSearch={onSearch}/>
                <select value={category as string} onChange={(e)=>{
                    setCategory(()=>(e.target.value as CategoryType))
                }}>
                    {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map((key) => (
                        <option>{CATEGORIES[key]}</option>
                    ))}
                </select>
        </div>
        {products?.map((product)=> (
            <div key={product.id}>
                <img className="w-40 h-40" src={product.thumbnail}/>
                {product.title}
            </div>
        ))}
    </div>
  )
}

export default App

//search changes -> filter apply to the new products
//filters changes -> search products should be applied with new category
