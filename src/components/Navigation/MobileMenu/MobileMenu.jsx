import React, {useRef, useEffect, useState} from 'react';
import {gsap} from 'gsap';
import {Link} from 'react-router-dom';
import classes from './MobileMenu.module.scss';
import ThemeSwitch from "../../ThemeSwitch/ThemeSwitch.jsx";
import Logo from "../../Logo/Logo.jsx";
import {useWindowDimensions} from "../../../context/WindowDimensionsContext.jsx";
import ReactDOM from "react-dom";
import {IoCloseSharp, IoMenu} from "react-icons/io5";

const MobileMenu = ({clingRight, isAdditional}) => {
    const {isSmartphone, isTablet} = useWindowDimensions()
    const menuRef = useRef();
    const navItemsRef = useRef([]);
    const closeRef = useRef();
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        gsap.set(navItemsRef.current, {opacity: 0, marginBottom: -5});
    }, []);

    const openMenu = () => {
        setIsOpen(true)
        const tl = gsap.timeline();
        tl.to(menuRef.current, {
            opacity: 1,
            duration: .25,
            top: 0,
            ease: "power2.in",
            onComplete: () => document.body.style.overflow = 'hidden'
        })
            .to(navItemsRef.current, {
                    opacity: 1,
                    marginBottom: 0,
                    duration: .15,
                    ease: "power2.in",
                    stagger: 0.05,

                },
                /*"-=0.5"*/
            );
    };

    const closeMenu = () => {
        document.body.style.overflow = 'unset'
        const tl = gsap.timeline();
        tl.to(navItemsRef.current, {
            opacity: 0,
            marginBottom: -5,
            duration: .05,
            ease: "power2.out",
            stagger: 0.05
        })
            .to(menuRef.current, {
                opacity: 0,
                duration: .5,
                top: "-100%",
                ease: "power1.inOut",
                onComplete: () => setIsOpen(false)
            }, /*"-=0.5"*/);
    };

    const handleNavClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeMenu()
        const target = event.target.closest('a');
        if (!target || !target.getAttribute('href')) return;

        const href = target.getAttribute('href');
        if (href.startsWith('#')) {
            const id = href.replace('#', '');
            const element = document.getElementById(id);
            element?.scrollIntoView({
                delay: 1,
                block: 'start',
                behavior: 'smooth'
            });
        } else if (href.startsWith('/')) {
            closeMenu();
        }
    };

    const menuItems = [
        {href: "#about", text: "About"},
        {href: "#events", text: "Events"},
        {href: "#menu", text: "Menu"},
        {href: "#locations", text: "Locations"},
        {href: "#contact", text: "Contact"},
        {href: "/jobs", text: "Jobs", isRouterLink: true}
    ];

    return (
        <>
            {isTablet &&
                <div className={`${classes.menuDiv} ${classes.inList}`} onClick={openMenu}><IoMenu size={40}/></div>}
            {!isOpen && isSmartphone &&
                <div className={`${classes.menuDiv} ${classes.solo} ${clingRight && classes.clingRight}`}
                     onClick={openMenu}><IoMenu size={40}/></div>}
            {ReactDOM.createPortal(
                <div className={classes.menu} ref={menuRef} style={{pointerEvents: !isOpen && 'none'}}
                     onClick={closeMenu}>
                    <div className={classes.background}><Logo width={"90vw"}/></div>
                    <div className={classes.exit} onClick={closeMenu} ref={closeRef}><IoCloseSharp size={40}/></div>
                    <div className={`${classes.menuContainer} ${classes.options}`} onClick={handleNavClick}>
                        <ul ref={(el) => (navItemsRef.current = el ? Array.from(el.children) : [])}>
                            {menuItems.map((item, index) => (
                                <li className={classes.nav} key={index}>
                                    {item.isRouterLink ? (
                                        <Link to={item.href} className={classes.navLink}><span
                                            className={classes.smallNumber}>0{index + 1}</span> {item.text}</Link>
                                    ) : (
                                        <a href={item.href} className={classes.navLink}><span
                                            className={classes.smallNumber}>0{index + 1}</span> {item.text}</a>
                                    )}
                                </li>
                            ))}
                            <li className={classes.nav} onClick={(e) => e.stopPropagation()}>
                                <div className={`${classes.navLink} ${classes.modeListItem}`}>
                                    <p>Dark / Light</p>
                                    <ThemeSwitch isOnAbsolute={true}/>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>,
                document.getElementById('menu-root')
            )
            }
        </>
    );
};

export default MobileMenu;
