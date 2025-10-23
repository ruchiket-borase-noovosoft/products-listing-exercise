import * as React from "react";
import {BrowserRouter} from "react-router-dom";

export default function Providers({children}: {children: React.ReactElement}){
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
}