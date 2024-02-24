import classes from "./Navbar.module.scss"
import Logo from "../Logo/Logo.jsx";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch.jsx";
import React from "react";
import {Link} from "react-router-dom";

function Navbar(props) {
    return (
        <nav id={"navBar"}>
            <div className={`${classes.navbar} container`}>
                <Logo width={175}/>
                <div className={classes.navLinks}>
                    <ul onClick={(event) => {
                        event.preventDefault();
                        const navBarElement = document.getElementById("navBar").clientHeight
                        const target = event.target;
                        const id = target.getAttribute('href')?.replace('#', '');
                       /* console.log(id)  TODO WHY WAS THERE SOME log?*/
                        const element = document.getElementById(id);
                       /* console.log(element)*/
                        element?.scrollIntoView({
                            block: 'start',
                            behavior: 'smooth'
                        })
                    }}>
                        <li className={"navLink"}><a href={"#home"}>Home</a></li>
                        <li className={"navLink"}><a href={"#about"}>About us</a></li>
                        <li className={"navLink"}><a href={"#events"}>Events</a></li>
                        <li className={"navLink"}><a href={"#locations"}>Locations</a></li>
                        <li className={"navLink"}><a href={"#contact"}>Contact</a></li>
                        <li className={"navLink"}><Link to={"/jobs"}>Jobs</Link></li>
                    </ul>
                    <div>
                        <ThemeSwitch />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;