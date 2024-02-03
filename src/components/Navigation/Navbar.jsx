import classes from "./Navbar.module.scss"
import Logo from "../Logo/Logo.jsx";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch.jsx";
import React from "react";

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
                        console.log(id)
                        const element = document.getElementById(id);
                        console.log(element)
                        element?.scrollIntoView({
                            block: 'start',
                            behavior: 'smooth'
                        })
                    }}>
                        <li href={"#home"}>Home</li>
                        <li href={"#about"}>About us</li>
                        <li href={"#events"}>Events</li>
                        <li href={"#locations"}>Locations</li>
                        <li href={"#contact"}>Contact</li>
                        <li href={"#jobs"}>Jobs</li>
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