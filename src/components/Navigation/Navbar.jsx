import classes from "./Navbar.module.scss"
import {useNavigate} from "react-router-dom";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import {useWindowDimensions} from "../../context/WindowDimensionsContext.jsx";
import {IoMenu} from "react-icons/io5";
import Logo from "../Logo/Logo.jsx";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch.jsx";
import {useMobileMenu} from "../../context/MobileMenuContext.jsx";
import {
    maxWidthMobile,
    minWidthTablet,
    navigationItems
} from "../../utility/Vars.jsx";
import {useLenis} from "@studio-freight/react-lenis";
import {useEffect} from "react";

gsap.registerPlugin(ScrollTrigger);

function Navbar() {
    const navigate = useNavigate();
    const {width, isSmartphone, isTablet, isDesktop} = useWindowDimensions()
    const {openMenu} = useMobileMenu()
    const lenisScroll = useLenis()
    const scrollToOptions = (offsetHeight) => ({
        // Customize scroll options if needed
        offset: -offsetHeight,
        duration: 1.5,
        easing: (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2, // Example easing function
        immediate: false,
        lock: false,
        force: false,
    });

/*    const [hasScrolledPast, setHasScrolledPast] = useState({top: false, bottom: false})

    let initialNavbarHeight = 250*/

    const fitMargin = () => {
        if(isSmartphone) {
            const navbar = document.getElementById('navBar');
            const linkHeap = document.getElementById('linkHeap');
            let heapHeight = linkHeap.offsetHeight
            navbar.style.marginTop = `${heapHeight - 66}px`
            ScrollTrigger.refresh() // TODO Causes scroll up and down issues
        }

    }

    useEffect(() => {
        fitMargin()
    }, []);

    useEffect(() => {
        fitMargin()
    }, [width]);

    const mobileAnimations = () => {
        //MOBILE
        const navbar = document.getElementById('navBar');
        const logo = document.getElementById('menuLogo');
        const icon = document.getElementById('menuIcon');
        const linkHeap = document.getElementById('linkHeap');
        const heapContainer = document.getElementById('heapContainer');


        if (navbar && icon && logo && heapContainer) {
            let heapHeight = linkHeap.offsetHeight

            gsap.to(heapContainer, {
                scale: .2,
                transformOrigin: "bottom bottom",
                y: '-13px',
                opacity: 0,
                scrollTrigger: {
                    trigger: navbar,
                    start: () => `bottom-=${heapHeight}px top`,
                    end: "bottom top+=66px",
                    scrub: true,
                    markers: false,
                    invalidateOnRefresh: true,
                }
            })

            let sctr = {
                trigger: navbar,
                start: "center 25%",
                end: "center top+=66px",
                scrub: 1,
                markers: false,
                invalidateOnRefresh: true,
            }

            gsap.from(icon, {
                opacity: 0,
                scrollTrigger: sctr
            })

            gsap.from(logo, {
                opacity: 0,
                scrollTrigger: {...sctr, start: 'bottom 20%', markers: false}
            })

        }
    }

    const nonMobileAnimations = () => {
        // DESKTOP
        const linkContainer = document.getElementById('desktopLinkContainer');
        const logo = document.getElementById('menuLogo');
        const linkList = document.getElementById('linkList');
        const navbar = document.getElementById('navBar');
        /*const icon = document.getElementById('menuIcon');*/

        if (navbar && logo && linkList && linkContainer) {
            let sctr = {
                trigger: navbar,
                start: "center center",
                end: "top 25%",
                scrub: .5,
                markers: false,
                invalidateOnRefresh: true,
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
    }

    useGSAP(() => {
        const matchMedia = gsap.matchMedia()
        matchMedia.add(`(max-width: ${maxWidthMobile}px)`, () => {
            mobileAnimations()
        })

        matchMedia.add(`(min-width: ${minWidthTablet}px)`, () => {
            nonMobileAnimations()
        })

    }, [isSmartphone])


    function handleLogoClick(event) {
        event.preventDefault()
        document.body.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        })
    }

    function filterNbyPriority(n, array) {
        if (n === 0 || array.length === 0) {
            return [];
        }

        const sortedByPriority = [...array].sort((a, b) => a.priority - b.priority);
        const nthHighestPriority = sortedByPriority[n - 1]?.priority;
        const filtered = array.filter(item => item.priority < nthHighestPriority);
        return filtered.slice(0, n);
    }

    let menuItems
    if (isTablet) {
        let temp = filterNbyPriority(4, navigationItems)
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


    let gotoLinks
    if (isSmartphone) {
        gotoLinks = [...navigationItems,
            {
                href: "#menu",
                text: "Food"
            },{
                href: "#menu",
                text: "Drinks"
            },{
                href: "#locations",
                text: "Opening hours"
            },
        ].map((item, idx) => {
            return <li key={idx} className={classes.navLink}><a
                href={item.href}>{`#${item.text}`}</a></li>
        })
    }

    function handleLinkClick(event) {
        event.preventDefault();
        const target = event.target.closest('a'); // Ensure you get the <a> tag even if the click is on a nested element
        if(!target) return
        const href = target.getAttribute('href');

        // Check if the link is a router link
        if (href.startsWith('/')) {
            navigate(href);
            return;
        }

        // Handle internal link scrolling
        const id = href.replace('#', '');
        const element = document.getElementById(id);
        const navbar = document.getElementById('navBar');
        let offsetHeight = navbar?.offsetHeight || 0;

        if (element) {
            lenisScroll.scrollTo(element, scrollToOptions(offsetHeight));
        }
    }

    let menuIcon = <div className={classes.menuIconWrapper} style={{cursor: 'pointer'}} id={'menuIcon'} onClick={openMenu}><IoMenu
        size={40}/></div>

    return <>
        {isDesktop &&
            <nav className={classes.navWrapper} id={"navBar"}>
                <div className={`${classes.navMenuWrapper} ${classes.nonMobile}`}>
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
                <div className={`${classes.navMenuWrapper} ${classes.nonMobile}`}>
                    <div className={classes.logoContainer} id={'menuLogo'}><a onClick={handleLogoClick}><Logo
                        width={"175px"}/></a></div>
                    <div className={`${classes.navLinks}`} id={'desktopLinkContainer'}>
                        <ul className={`${classes.linkUl}`} id={'linkList'} onClick={handleLinkClick}>
                            {menuItems}
                            {menuIcon}
                            <ThemeSwitch isOnAbsolute={true}/>
                        </ul>
                    </div>
                </div>
            </nav>
        }
        {isSmartphone && //MOBILE
            <>
                <nav className={`${classes.navWrapper} `} id={"navBar"}>
                    <div className={`${classes.navMenuWrapper} ${classes.mobile}`}>
                        <div className={classes.logoContainer} id={'menuLogo'}><a onClick={handleLogoClick}><Logo
                            width={"175px"}/></a></div>
                        {menuIcon}
                    </div>
                    <div className={classes.heapContainer} id={'heapContainer'}>
                        <div className={classes.linkHeap} id={'linkHeap'}>
                            <h2 id={'heapHeading'}>Goto:</h2>
                            <ul className={`${classes.heap} `} id={'heapList'}
                                onClick={(event) => handleLinkClick(event)}>
                                {gotoLinks}
                            </ul>
                        </div>
                    </div>
                </nav>

            </>
        }
    </>
}

export default Navbar;