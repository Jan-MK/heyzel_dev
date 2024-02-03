import classes from "./Logo.module.scss"
import heyzel from "../../assets/heyzel-logo.svg"
function Logo({width}) {
    return (
        <img src={heyzel} style={{height: `auto`, width: `${width}px`}} className="logo" alt="Heyzel logo" />
    );
}

export default Logo;