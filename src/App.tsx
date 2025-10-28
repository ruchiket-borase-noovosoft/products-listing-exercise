import Routers from "./Pages/Routers.tsx";
import Providers from "./utils/Providers.tsx";
import Navbar from "./components/Navbar.tsx";

function App() {
    return (
        <Providers>
    <div className="w-full h-full  md:w-[80%] md:mx-auto">
        <Navbar/>
        <Routers/>
    </div></Providers>
    )
}

export default App;