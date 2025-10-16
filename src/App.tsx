import {useCallback, useEffect, useState} from "react";
import Search from "./components/Search.tsx";

function handleFilter(products, category?: string){
        return category ?  products.filter((product) => product.category === category) : products
}

function App() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState<{category:string}>();
    const [search, setSearch] = useState<string>();


    useEffect(() => {
        fetch('https://dummyjson.com/products/category-list')
            .then(res => res.json())
            .then(setCategories);
    },[]);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json()).then((data) => setProducts(data.products))
    },[]);

    useEffect(() => {
        filters?.category && setProducts(prev => handleFilter(prev, filters.category))
    },[filters]);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/search?q=${search}`)
            .then(res => res.json())
            .then((data) => {setProducts(handleFilter(data.products, filters?.category))
            });
    },[search,filters]);

    const onSearch = useCallback(function onSearch (value){
        setSearch(value)
    },[]);

    return (
    <div>
        <div>
            <Search handleSearch={onSearch}/>
            <div>
                <select value={filters?.category} onChange={(e)=>{
                    setFilters((prev)=>({...prev, category : e.target.value}))
                }}>
                    <option value="">All</option>
                    {
                        categories.map((category)=> (
                            <option key={category} value={category.toLowerCase()}>{category}</option>
                        ))
                    }
                </select>
            </div>
        </div>
        {products.map((product)=> (
            <div key={product.id}>
                <img className="w-40 h-40" src={product.thumbnail}/>
                {product.title}
            </div>
        ))}
    </div>
  )
}

export default App
