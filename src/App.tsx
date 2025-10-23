import {useState, useCallback} from "react";
import useFetchProducts from "./utils/hooks/useFetchProducts.ts";
import type {CATEGORIES as CategoryType} from "./utils/constants.ts";
import {CATEGORIES} from "./utils/constants.ts";
import CartIcon from "./components/interactive/icons/CartIcon.tsx"
import Routers from "./Pages/Routers.tsx";
import {NavLink} from "react-router-dom";
import Providers from "./utils/Providers.tsx";

function App() {
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<CategoryType>(CATEGORIES.ALL);

    const {products, loading} = useFetchProducts(search, category)
    const onSearch = useCallback(function onSearch (value: string){
        setSearch(value)
    },[]);

    return (
        <Providers>
    <div className="w-full h-full md:w-[80%] mx-auto">
        <div className="w-full p-4 flex justify-between border-b border-gray-200">
            <NavLink to="/"><h3 className="flex-1 font-bold text-lg">ProCommerce</h3></NavLink>
            <div className="flex gap-4 items-center px-4">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/cart">Cart</NavLink>
            </div>
        </div>
        <Routers/>
    </div>
        </Providers>
    )
}

export default App;