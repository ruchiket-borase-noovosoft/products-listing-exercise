import {BrowserRouter, Route, Routes} from "react-router-dom";
import type {ReactElement} from "react";
import Cart from "./Cart.tsx";
import * as React from "react";

const Home = React.lazy(() => import("./Home.tsx"));

export default function Routers () {
    return(
            <Routes>
                <Route path="/" element={<Home/> as ReactElement}/>
                <Route path="/cart" element={<Cart/> as ReactElement}/>
            </Routes>
    )
}