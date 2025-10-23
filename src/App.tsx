import {useState, useCallback} from "react";
import useFetchProducts from "./utils/hooks/useFetchProducts.ts";
import type {CATEGORIES as CategoryType} from "./utils/constants.ts";
import {CATEGORIES} from "./utils/constants.ts";
import CartIcon from "./components/interactive/icons/CartIcon.tsx"
import Routers from "./Pages/Routers.tsx";
import {NavLink} from "react-router-dom";
import Providers from "./utils/Providers.tsx";
import Navbar from "./components/Navbar.tsx";

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
        <Navbar/>
        <Routers/>
    </div>
        </Providers>
    )
}

export default App;