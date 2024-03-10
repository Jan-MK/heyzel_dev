import classes from "./Navbar.module.scss"
import {Link} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import {useWindowDimensions} from "../../context/WindowDimensionsContext.jsx";
import MobileMenu from "../../context/MobileMenu/MobileMenu.jsx";
import {IoMenu} from "react-icons/io5";
import Logo from "../Logo/Logo.jsx";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch.jsx";
import {useMobileMenu} from "../../context/MobileMenuContext.jsx";
import {
    maxWidthMobile,
    maxWidthTablet,
    minWidthDesktop,
    minWidthTablet,
    navigationItems
} from "../../utility/Vars.jsx";

gsap.registerPlugin(ScrollTrigger);

function Navbar(props) {
    const {width, height, isSmartphone, isTablet, isDesktop} = useWindowDimensions()
    const {openMenu} = useMobileMenu()
    const [hasScrolledPast, setHasScrolledPast] = useState({top: false, bottom: false})

    let initialNavbarHeight = 250

    useGSAP(() => {
        const matchMedia = gsap.matchMedia()
        matchMedia.add(`(max-width: ${maxWidthMobile}px)`, () => {
            //MOBILE && TABLET
            const navbar = document.getElementById('navBar');
            const logo = document.getElementById('menuLogo');
            const icon = document.getElementById('menuIcon');
            /*            const spacer = document.getElementById('navSpacer');
                        const heapUl = document.getElementById('heapList');
                        const linkHeap = document.getElementById('linkHeap');
                        const heading = document.getElementById('heapHeading');
                        const listItems = document.querySelectorAll('#heapList li');
                        const listItemLinks = document.querySelectorAll('#heapList li a');*/

            if (navbar && icon && logo) {

                gsap.from(icon, {
                    opacity: 0,
                    scrollTrigger: {
                        trigger: navbar,
                        start: "bottom bottom",
                        end: "center center",
                        scrub: 1,
                    }
                })

                gsap.from(icon, {
                    left: "50%",
                    xPercent: -50,
                    scrollTrigger: {
                        trigger: navbar,
                        start: "center 75%",
                        end: "top top",
                        scrub: 1,
                    }
                })

                gsap.from(logo, {
                    opacity: 0,
                    scrollTrigger: {
                        trigger: navbar,
                        start: "center center",
                        end: "top top",
                        scrub: 1,
                    }
                })

            }
            /* TODO Working solution without resizing on scroll up for mobile

            let sctr = {
                trigger: navbar,
                start: "top top",
                end: "bottom top",
                scrub: true,
                markers: true,
            }

            gsap.from(navbar, {
                height: "250px",
                scrollTrigger: sctr,
            })


            gsap.from(icon, {
                opacity: 0,
                scrollTrigger: {
                    ...sctr,
                    start: "65% top"}
            })
            gsap.from(logo, {
                opacity: 0,
                scrollTrigger: {
                    ...sctr,
                    start: "75% top"}
            })
            gsap.from(icon, {
                left: "50%",
                xPercent: -50,
                scrollTrigger: {
                    ...sctr,
                    start: "75% top"}
            })

            gsap.to(heapUl, {
                opacity: 0,
                width: "60px",
                //top: -heapUl.offsetTop,
                scrollTrigger: sctr
            })
            gsap.to(heading, {
                opacity: 0,
                fontSize: "1px",
                scrollTrigger: sctr
            })
            gsap.to(listItems, {
                fontSize: "1px",
                //top: 0,
                scrollTrigger: sctr
            })
            gsap.to(listItemLinks, {
                padding: 0,
                scrollTrigger: sctr
            })*/
        })

        matchMedia.add(`(min-width: ${minWidthTablet}px)`, () => {
            // DESKTOP
            const linkContainer = document.getElementById('desktopLinkContainer');
            const logo = document.getElementById('menuLogo');
            const linkList = document.getElementById('linkList');
            const navbar = document.getElementById('navBar');
            const icon = document.getElementById('menuIcon');

            if (navbar && logo && linkList && linkContainer) {
                let sctr = {
                    trigger: navbar,
                    start: "center center",
                    end: "top 25%",
                    scrub: .5,
                    markers: false
                }

                gsap.from(linkList, {
                    width: linkContainer.offsetWidth,
                    scrollTrigger: sctr
                })

                gsap.from(logo, {
                    opacity: 0,
                    scrollTrigger: {
                        ...sctr,
                        start: "center 35%"
                    }
                })
            }
        })
    })

    useEffect(() => {
        const scrollTriggerRefresh = () => {
            ScrollTrigger.refresh();
        }
        scrollTriggerRefresh()
    }, [width, height]); //TODO - do i need that?

    useEffect(() => {
        // Useeffect to decide if navBar is past top by getting the bottom border of the hero element. Important!!
        const checkScrollPosition = () => {
            let hero = document.getElementById('hero')
            if (hero) {
                const elementTop = hero.getBoundingClientRect().bottom;
                const elementBottom = hero.getBoundingClientRect().bottom + initialNavbarHeight;
                if (elementTop <= 1) {
                    setHasScrolledPast(prev => ({
                        ...prev,
                        top: true
                    }));
                } else {
                    setHasScrolledPast(prev => ({
                        ...prev,
                        top: false
                    }));
                }
                if (elementBottom <= 1) {
                    setHasScrolledPast(prev => ({
                        ...prev,
                        bottom: true
                    }));
                } else {
                    setHasScrolledPast(prev => ({
                        ...prev,
                        bottom: false
                    }));
                }
            }
        };

        window.addEventListener('scroll', checkScrollPosition);
        checkScrollPosition();

        return () => window.removeEventListener('scroll', checkScrollPosition);
    }, [hasScrolledPast.top, hasScrolledPast.bottom]);

    function handleLogoClick(event) {
        event.preventDefault()
        document.body.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        })
    }

    function handleLinkClick(event) {
        event.preventDefault();
        const target = event.target;
        const id = target.getAttribute('href')?.replace('#', '');
        if (!id) return;
        const element = document.getElementById(id);
        const navbar = document.getElementById('navBar');
        let offsetHeight = navbar?.offsetHeight || 0
        element.style.scrollMargin = `${offsetHeight}px`
        element?.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        })
    }

    function filterNbyPrio(n, array) {
        if (n === 0 || array.length === 0) {
            return [];
        }

        const sortedByPriority = [...array].sort((a, b) =>  a.priority - b.priority);
        const nthHighestPriority = sortedByPriority[n - 1]?.priority;
        const filtered = array.filter(item => item.priority < nthHighestPriority);
        return filtered.slice(0, n);
    }

    let menuItems = []

    if (isTablet) {
        let temp = filterNbyPrio(4, navigationItems)
        menuItems = temp.map((item, idx) => {
            return <li key={idx} className={classes.navLink}><a
                href={item.href}>{`${isDesktop || isTablet ? '' : '#'}${item.text}`}</a></li>
        })
    } else {
        menuItems = navigationItems.map((item, idx) => {
            return <li key={idx} className={classes.navLink}><a
                href={item.href}>{`${isDesktop ? '' : '#'}${item.text}`}</a></li>
        })
    }


    return <>
        {isDesktop &&
            <nav className={classes.navWrapper} id={"navBar"}>
                <div className={`${classes.navMenuWrapper}`}>
                    <div className={classes.logoContainer} id={'menuLogo'}><a onClick={handleLogoClick}><Logo
                        width={"175px"}/></a></div>
                    <div className={`${classes.navLinks}`} id={'desktopLinkContainer'}>
                        <ul className={`${classes.linkUl}`} id={'linkList'} onClick={handleLinkClick}>
                            {menuItems}
                            <ThemeSwitch isOnAbsolute={true}/>
                        </ul>
                    </div>
                </div>
            </nav>}
        {isTablet &&
            <nav className={classes.navWrapper} id={"navBar"}>
                <div className={`${classes.navMenuWrapper}`}>
                    <div className={classes.logoContainer} id={'menuLogo'}><a onClick={handleLogoClick}><Logo
                        width={"175px"}/></a></div>
                    <div className={`${classes.navLinks}`} id={'desktopLinkContainer'}>
                        <ul className={`${classes.linkUl}`} id={'linkList'} onClick={handleLinkClick}>
                            {menuItems}
                            <div className={classes.menuIconWrapper} id={'menuIcon'} onClick={openMenu}><IoMenu size={40}/></div>
                            <ThemeSwitch isOnAbsolute={true}/>
                        </ul>
                    </div>
                </div>
            </nav>
        }
        {isSmartphone && //MOBILE
            <nav className={`${classes.navWrapper}`} id={"navBar"}>
                <div className={classes.navMenuWrapper}>
                    <div className={classes.logoContainer} id={'menuLogo'}><a onClick={handleLogoClick}><Logo
                        width={"175px"}/></a></div>
                    <div className={classes.menuIconWrapper} id={'menuIcon'} onClick={openMenu}><IoMenu size={40}/>
                    </div>
                    {/*                    <div className={classes.quickLinks} onClick={handleLinkClick}>
                        {navigationItems.map((el, idx) => <a key={idx} href={el.href}>{el.text}</a>)}
                    </div>*/}
                </div>

                {/*<div className={classes.linkHeap} id={'linkHeap'}>
                    <h2 id={'heapHeading'}>Jump to:</h2>
                    <ul className={`${classes.heap} `} id={'heapList'} onClick={(event) => handleLinkClick(event, true)}>
                        {menuItems}
                    </ul>
                </div>*/}
            </nav>}
    </>
}

export default Navbar;