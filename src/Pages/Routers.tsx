import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home.tsx";
import type {ReactElement} from "react";
import Cart from "./Cart.tsx";

export default function Routers () {
    return(
            <Routes>
                <Route path="/" element={<Home/> as ReactElement}/>
                <Route path="/cart" element={<Cart/> as ReactElement}/>
            </Routes>
    )
}