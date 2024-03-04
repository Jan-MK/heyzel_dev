

import React, {useRef, useEffect, useState} from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import classes from './MobileMenu.module.scss';
import ThemeSwitch from "../../ThemeSwitch/ThemeSwitch.jsx";
import Logo from "../../Logo/Logo.jsx";
import {MdClose, MdMenu} from "react-icons/md";

const MobileMenu = ({clingRight}) => {
    const menuRef = useRef();
    const navItemsRef = useRef([]);
    const closeRef = useRef();
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        gsap.set(navItemsRef.current, { opacity: 0, marginBottom: -20 });
    }, []);

    const openMenu = () => {
        setIsOpen(true)
        const tl = gsap.timeline();
        tl.to(menuRef.current, { opacity: 1, duration: .25, top: 0, ease: "power2.easeIn" })
            .to(navItemsRef.current, { opacity: 1, marginBottom: 0, duration: .25, ease: "power2.easeIn", stagger: 0.15 }, "-=0.5");
    };

    const closeMenu = () => {
        setIsOpen(false)
        const tl = gsap.timeline();
        tl.to(navItemsRef.current, { opacity: 0, marginBottom: -20, duration: .25, ease: "power2.easeOut", stagger: 0.1 })
            .to(menuRef.current, { opacity: 0, duration: .25, top: "-100%", ease: "power2.easeOut" }, "-=0.5");
    };

    const handleNavClick = (event) => {
        event.preventDefault();
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
        { href: "#home", text: "Home" },
        { href: "#about", text: "About us" },
        { href: "#events", text: "Events" },
        { href: "#menu", text: "Menu" },
        { href: "#locations", text: "Locations" },
        { href: "#contact", text: "Contact" },
        { href: "/jobs", text: "Jobs", isRouterLink: true }
    ];

    return (
        <>
            {!isOpen && <div className={`${classes.menuDiv} ${clingRight && classes.clingRight}`} onClick={openMenu}><MdMenu size={40} /></div>}
            <div className={classes.menu} ref={menuRef}>
                <div className={classes.background}><Logo width={"90vw"} /></div>
                <div className={classes.exit} onClick={closeMenu} ref={closeRef}><MdClose size={40} /></div>
                <div className={`${classes.menuContainer} ${classes.options}`} onClick={handleNavClick}>
                    <ul ref={(el) => (navItemsRef.current = el ? Array.from(el.children) : [])}>
                        {menuItems.map((item, index) => (
                            <li className={classes.nav} key={index}>
                                {item.isRouterLink ? (
                                    <Link to={item.href} className={classes.navLink}><span className={classes.smallNumber}>0{index + 1}</span> {item.text}</Link>
                                ) : (
                                    <a href={item.href} className={classes.navLink}><span className={classes.smallNumber}>0{index + 1}</span> {item.text}</a>
                                )}
                            </li>
                        ))}

                    </ul>

                    <div className={`${classes.menuContainer} ${classes.right}`} >
                        <div className={classes.information}>
                            <p className={classes.title}>Adresssss</p>
                            <p className={classes.description}>Augsburg</p>

                        </div>
                        <div className={classes.information}>
                            <p className={classes.title}>Contact</p>
                            <p className={classes.description}>mail mail mail</p>

                        </div>
                        <div className={classes.information}>
                            <p className={classes.title}>Follow me</p>
                            <div className={classes.socialMedias}>
                                <a href="" className={classes.socialMedia}>twitter</a>
                                <a href="" className={classes.socialMedia}>youtube</a>
                            </div>
                        </div>
                    </div>
                </div>
                <ThemeSwitch />
            </div>
        </>
    );
};

export default MobileMenu;
