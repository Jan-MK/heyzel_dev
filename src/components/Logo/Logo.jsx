import classes from "./Logo.module.scss"
import heyzel from "../../assets/heyzel-logo.svg"
import {useContext} from "react";
import NavbarContext from "../../context/NavbarContext.jsx";
function Logo({width}) {
    const {logoRef} = useContext(NavbarContext)

    return (
        <img ref={logoRef} src={heyzel} style={{height: `auto`, width: `${width}`}} className="logo" alt="Heyzel logo" />
    );
}

export default Logo;