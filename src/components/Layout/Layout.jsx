import classes from "./Layout.module.scss"
import Navbar from "../Navigation/Navbar.jsx";

function Layout({children}) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}

export default Layout;