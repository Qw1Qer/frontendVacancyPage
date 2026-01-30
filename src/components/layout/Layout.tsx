import "./Layout.css"
import Header from "../Header/Header.tsx";
import { Outlet} from "react-router-dom";


const Layout = () => {


    return (
        <>
            <header>
                <Header />
            </header>
            <main >
                <Outlet />
            </main>
        </>
    );
};

export default Layout;