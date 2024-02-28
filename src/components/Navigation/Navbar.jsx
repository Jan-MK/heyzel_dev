import classes from "./Navbar.module.scss"
import Logo from "../Logo/Logo.jsx";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch.jsx";
import {useContext, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import NavbarContext from "../../context/NavbarContext.jsx";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {getRandomColor} from "../../utility/Utility.jsx";

gsap.registerPlugin(ScrollTrigger);

function Navbar({notTop}) {
    const [bigGap, setBigGap] = useState(notTop)
    const {navbarRef, logoRef} = useContext(NavbarContext)
    const navBarContainerRef = useRef(null)
    const navLinksRef = useRef(null)
    const logoContainerRef = useRef(null)

    useGSAP(() => {
        const navbar = navbarRef.current
        const navbarContainer = navBarContainerRef.current
        const navLinks = navLinksRef.current
        const logoContainer = logoContainerRef.current
        if (navbar && notTop) {
            let startAdjusted = 'top-=1px top'
            ScrollTrigger.create({
                trigger: navbar,
                start: 'top top',
                endTrigger: 'bottom bottom',
                pin: [navbar],
                pinSpacing: false,
                scrub: true,
                markers: false,
            })
            gsap.fromTo(logoContainer, {opacity: 0},
                {
                opacity: 1,
                duration: .5,
                scrollTrigger: {
                    trigger: navbar,
                    start: startAdjusted,
                    endTrigger: 'bottom bottom',
                    toggleActions: "restart none none reverse",
                    markers: false,
                }
            })
            let xTrans = -(navbarContainer.offsetWidth - navLinks.offsetWidth) / 2
            gsap.from(navLinks, {
                x: xTrans,
                duration: .5,
                scrollTrigger: {
                    trigger: navbar,
                    start: startAdjusted,
                    endTrigger: 'bottom bottom',
                    toggleActions: "restart none none reverse",
                    markers: false,
                    onToggle: () => {
                        setBigGap(prev => {
                            return !prev
                        })
                    }
                }
            })

        }
    })

    function handleLogoClick(e) {
            e.preventDefault()
            document.body.scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            })
    }


    return (
        <nav id={"navBar"} ref={navbarRef}>
            <div className={`${classes.navbar} ${notTop ? classes.notTop : classes.top} container`}
                 ref={navBarContainerRef}>
                <div ref={logoContainerRef}><a onClick={handleLogoClick}><Logo width={"175px"}/></a></div>
                <div className={`${classes.navLinks}`} ref={navLinksRef}>
                    <ul className={`${bigGap ? classes.bigGap : classes.smallGap}`}
                        onClick={(event) => {
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
                        <ThemeSwitch isOnAbsolute={true}/>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;