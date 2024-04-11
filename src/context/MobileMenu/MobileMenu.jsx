import {useRef, useEffect, useState} from 'react';
import {gsap} from 'gsap';
import {Link} from 'react-router-dom';
import classes from './MobileMenu.module.scss';
import ThemeSwitch from "../../components/ThemeSwitch/ThemeSwitch.jsx";
import Logo from "../../components/Logo/Logo.jsx";
import ReactDOM from "react-dom";
//import {IoCloseSharp} from "react-icons/io5";
import {useMobileMenu} from "../MobileMenuContext.jsx";
import {navigationItems} from "../../utility/Vars.jsx";
import {useLenis} from "@studio-freight/react-lenis";
import {useTranslation} from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import Icon from "../../components/Icons/Icon.jsx";

const MobileMenu = () => {
    const {t, i18n} = useTranslation();
    let lenis = useLenis()
    const {isOpen, closeMenu} = useMobileMenu();
    const menuRef = useRef(null)
    const navItemsRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

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
                        onComplete: () => {
                            lenis.stop()
                            document.body.style.overflow = 'hidden'
                        },
                    }, "<");
                console.log("FOUND")
            } else {
                console.log("NOT FOUND")
            }
        } else {
            if (mmc && navItemsRef) {
                lenis?.start()
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
        }
        return () => {
            gsap.killTweensOf(mmc);
            gsap.killTweensOf(navItemsRef?.current);

            if (isVisible) {
                lenis?.start()
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
        <div data-lenis-prevent className={classes.menu} id={'mobileMenuContainer'} ref={menuRef}>
            <div className={classes.background}><Logo width={"90vw"}/></div>
            <div className={classes.exit} onClick={closeMenu}><Icon type={"close"} width={"30"} measure={"px"}/></div>
            <div className={`${classes.menuContainer} ${classes.options}`} onClick={handleNavClick}>
                <ul ref={(el) => (navItemsRef.current = el ? Array.from(el.children) : [])}>
                    {navigationItems.map((item, index) => (
                        <li className={classes.nav} key={index}>
                            {item.isRouterLink ? (
                                <Link to={item.href} className={classes.navLink}><span
                                    className={classes.smallNumber}>0{index + 1}</span> {t(`menu.${item.key}`)}</Link>
                            ) : (
                                <a href={item.href} className={classes.navLink}><span
                                    className={classes.smallNumber}>0{index + 1}</span> {t(`menu.${item.key}`)}</a>
                            )}
                        </li>
                    ))}
                    <li className={classes.nav} onClick={(e) => e.stopPropagation()}>
                        <div className={`${classes.navLink} ${classes.modeListItem}`}>
                            <p>{t('general.mode')}</p>
                            <ThemeSwitch isOnAbsolute={true}/>
                        </div>
                    </li>
                    <li className={classes.nav} onClick={(e) => {
                        e.stopPropagation()
                        i18n.changeLanguage(i18n.resolvedLanguage === 'en' ? 'de' : 'en')
                    }}>
                        <div className={`${classes.navLink} ${classes.modeListItem}`}>
                            <p>{t('general.switch')}</p>
                            <ReactCountryFlag svg style={{width: '25px', height: 'auto'}}
                                              countryCode={i18n.resolvedLanguage === 'en' ? 'DE' : 'GB'}/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>,
        document.getElementById('menu-root')
    );
};

export default MobileMenu;