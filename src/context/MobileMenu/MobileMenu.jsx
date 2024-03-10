import React, {useRef, useEffect, useState} from 'react';
import {gsap} from 'gsap';
import {Link} from 'react-router-dom';
import classes from './MobileMenu.module.scss';
import ThemeSwitch from "../../components/ThemeSwitch/ThemeSwitch.jsx";
import Logo from "../../components/Logo/Logo.jsx";
import {useWindowDimensions} from "../WindowDimensionsContext.jsx";
import ReactDOM from "react-dom";
import {IoCloseSharp, IoMenu} from "react-icons/io5";
import {useMobileMenu} from "../MobileMenuContext.jsx";
import {useGSAP} from "@gsap/react";
import {navigationItems} from "../../utility/Vars.jsx";

const MobileMenu = ({clingRight, isAdditional}) => {
    // Inside MobileMenu component
    const {isSmartphone, isTablet} = useWindowDimensions();
    const {isOpen, closeMenu} = useMobileMenu();
    const menuRef = useRef(null)
    const navItemsRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    // Initial GSAP settings for nav items
    useEffect(() => {
        if (navItemsRef.current && navItemsRef.current.length > 0) {
            gsap.set(navItemsRef.current, {opacity: 0, y: -20});
        }
    }, [navItemsRef]);

    useEffect(() => {
        let mmc = document.getElementById('mobileMenuContainer')
        if (isOpen) {
            if (mmc && navItemsRef) {
                setIsVisible(true)
                const tl = gsap.timeline();
                tl.to(mmc, {
                    opacity: 1,
                    duration: 0.25,
                    top: 0,
                    ease: "power2.in",
                })
                    .to(navItemsRef.current, {
                        opacity: 1,
                        marginBottom: 0,
                        duration: 0.15,
                        ease: "power2.in",
                        stagger: 0.05,
                        onComplete: () => document.body.style.overflow = 'hidden',
                    }, "<"); // Use "<" to slightly overlap the start of this animation with the end of the previous one
                console.log("FOUND")
            } else {
                console.log("NOT FOUND")
            }
        } else {
            document.body.style.overflow = 'unset';
            const tl = gsap.timeline({
                onComplete: () => {
                    setIsVisible(false);
                }
            });
            tl.to(navItemsRef.current, {
                opacity: 0,
                marginBottom: -5,
                duration: 0.05,
                ease: "power2.out",
                stagger: 0.05,
            })
                .to(mmc, {
                    opacity: 0,
                    duration: 0.5,
                    top: "-100%",
                    ease: "power1.inOut",
                }, "<");
        }
        return () => {
            // Kill GSAP animation to prevent it from finishing if the component unmounts
            gsap.killTweensOf(mmc);
            gsap.killTweensOf(navItemsRef?.current);

            // Restore body overflow only if closing the modal or unmounting
            if (isVisible) {
                document.body.style.overflow = 'unset';
            }
        };
    }, [isOpen])

    const handleNavClick = (event) => {
        event.preventDefault();
        closeMenu();
        const target = event.target.closest('a');
        if (!target || !target.getAttribute('href')) return;

        const href = target.getAttribute('href');
        if (href.startsWith('#')) {
            const id = href.replace('#', '');
            const element = document.getElementById(id);
            element?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };


    return ReactDOM.createPortal(
        (isVisible || isOpen) &&
        <div className={classes.menu} id={'mobileMenuContainer'} ref={menuRef}>
            <div className={classes.background}><Logo width={"90vw"}/></div>
            <div className={classes.exit} onClick={closeMenu}><IoCloseSharp size={40}/></div>
            <div className={`${classes.menuContainer} ${classes.options}`} onClick={handleNavClick}>
                <ul ref={(el) => (navItemsRef.current = el ? Array.from(el.children) : [])}>
                    {navigationItems.map((item, index) => (
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
        document.getElementById('menu-root') // Change `document.getElementById('menu-root')` as per your requirement
    );
};

export default MobileMenu;


/*(
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
    );*/