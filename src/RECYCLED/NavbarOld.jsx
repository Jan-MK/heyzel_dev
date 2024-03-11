import classes from "./NavbarOld.module.scss"
import Logo from "../components/Logo/Logo.jsx";
import ThemeSwitch from "../components/ThemeSwitch/ThemeSwitch.jsx";
import {useContext, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import ReferenceContext from "../context/ReferenceContext.jsx";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import MobileMenu from "../context/MobileMenu/MobileMenu.jsx";
import {useWindowDimensions} from "../context/WindowDimensionsContext.jsx";
import {maxWidthMobile} from "../utility/Vars.jsx";

gsap.registerPlugin(ScrollTrigger);


function NavbarOld({notTop}) {
    const {isSmartphone, isTablet, isDesktop} = useWindowDimensions()
    const [isMounted, setIsMounted] = useState(false);
    const {navbarRef} = useContext(ReferenceContext)
    const navBarContainerRef = useRef(null)
    const navLinksRef = useRef(null)
    const logoContainerRef = useRef(null)
    const [hasScrolledPast, setHasScrolledPast] = useState(false);
    const {height, width} = useWindowDimensions()

    useEffect(() => {
        // Useeffect to decide if navBar is past top by getting the bottom border of the hero element. Important!!
        const checkScrollPosition = () => {
            let hero = document.getElementById('hero')
            if (hero) {
                const elementTop = hero.getBoundingClientRect().bottom;
                if (elementTop <= 1) {
                    setHasScrolledPast(true);
                } else {
                    setHasScrolledPast(false);
                }
            }
        };

        window.addEventListener('scroll', checkScrollPosition);
        checkScrollPosition();

        return () => window.removeEventListener('scroll', checkScrollPosition);
    }, [hasScrolledPast]);

/*    useEffect(() => {
        const scrollTriggerRefresh = () => {
            ScrollTrigger.refresh();
        }
        scrollTriggerRefresh()
    }, [width, height]);*/

    useGSAP(() => {
        const navbar = navbarRef.current
        const logoContainer = logoContainerRef.current
        if (navbar && notTop) {
            let startAdjusted = 'top-=1px top'
            ScrollTrigger.create({
                trigger: navbar,
                start: 'top top',
                endTrigger: 'bottom top',
                pin: [navbar],
                pinSpacing: false,
                scrub: true,
                markers: false,
            })
            const logoAnim = gsap.timeline({
                paused: true,
                defaults: {duration: 0.25}
            }).fromTo(logoContainer, {opacity: 0}, {opacity: 1});

            ScrollTrigger.create({
                trigger: navbar,
                start: startAdjusted,
                end: "bottom bottom",
                markers: false,
                onEnter: () => logoAnim.play().delay(.5),
                onLeaveBack: () => logoAnim.reverse(0),
            });
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
                <div className={classes.logoContainer} ref={logoContainerRef}><a onClick={handleLogoClick}><Logo
                    width={"175px"}/></a></div>
                {isDesktop &&
                    <div className={`${classes.navLinks} ${hasScrolledPast ? classes.clingRight : classes.center}`}
                         ref={navLinksRef}>
                        <ul className={`${classes.desktop}`}
                            onClick={(event) => {
                                event.preventDefault();
                                const target = event.target;
                                const id = target.getAttribute('href')?.replace('#', '');
                                const element = document.getElementById(id);
                                element?.scrollIntoView({
                                    block: 'start',
                                    behavior: 'smooth'
                                })
                            }}>
                            <li className={"navLink"}><a href={"#about"}>About</a></li>
                            <li className={"navLink"}><a href={"#events"}>Events</a></li>
                            <li className={"navLink"}><a href={"#menu"}>Menu</a></li>
                            <li className={"navLink"}><a href={"#locations"}>Locations</a></li>
                            <li className={"navLink"}><a href={"#contact"}>Contact</a></li>
                            {/*<li className={"navLink"}><Link to={"/jobs"}>Jobs</Link></li>*/}
                            <ThemeSwitch isOnAbsolute={true}/>
                        </ul>


                    </div>}
                {isTablet &&
                    <div className={`${classes.navLinks} ${hasScrolledPast ? classes.clingRight : classes.center}`}
                         ref={navLinksRef}>
                        <ul className={`${classes.desktop} ${hasScrolledPast ? classes.bigGap : classes.smallGap}`}
                            onClick={(event) => {
                                event.preventDefault();
                                const target = event.target;
                                const id = target.getAttribute('href')?.replace('#', '');
                                const element = document.getElementById(id);
                                element?.scrollIntoView({
                                    block: 'start',
                                    behavior: 'smooth'
                                })
                            }}>
                            <li className={"navLink"}><a href={"#menu"}>Menu</a></li>
                            <li className={"navLink"}><a href={"#locations"}>Locations</a></li>
                            <li className={"navLink"}><a href={"#contact"}>Contact</a></li>
                            <MobileMenu isMounted={isMounted} isAdditional={true}/>
                            {/*<li className={"navLink"}><Link to={"/jobs"}>Jobs</Link></li>*/}
                        </ul>


                    </div>}
                {isSmartphone && <MobileMenu clingRight={hasScrolledPast}/>}
            </div>
        </nav>
    );
}

export default NavbarOld;