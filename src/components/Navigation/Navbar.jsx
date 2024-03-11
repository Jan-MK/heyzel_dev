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

gsap.registerPlugin(ScrollTrigger);

function Navbar() {
    const navigate = useNavigate();
    const {isSmartphone, isTablet, isDesktop} = useWindowDimensions()
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

    useGSAP(() => {
        const matchMedia = gsap.matchMedia()
        matchMedia.add(`(max-width: ${maxWidthMobile}px)`, () => {
            //MOBILE && TABLET
            const navbar = document.getElementById('navBar');
            const logo = document.getElementById('menuLogo');
            const icon = document.getElementById('menuIcon');
            const linkHeap = document.getElementById('linkHeap');
            const heapContainer = document.getElementById('heapContainer');


            if (navbar && icon && logo && heapContainer) {
                let heapHeight = linkHeap.offsetHeight
                gsap.set(navbar, {marginTop: `${heapHeight - 66}px`})

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
                    }
                })

/*                gsap.from(icon, {
                    opacity: 0,
                    scrollTrigger: {
                        trigger: navbar,
                        start: "bottom bottom",
                        end: "center center",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                })*/

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
        })

        matchMedia.add(`(min-width: ${minWidthTablet}px)`, () => {
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
        })

    })

    /*    useEffect(() => {
            const scrollTriggerRefresh = () => {
                ScrollTrigger.refresh();
            }
            scrollTriggerRefresh()
        }, [width, height]); //TODO - do i need that? Causes problems*/

/*    useEffect(() => {
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
    }, [hasScrolledPast.top, hasScrolledPast.bottom]);*/

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
    /*
    export const navigationItems = [
    {href: "#about", text: "About", priority: 9},
    {href: "#events", text: "Events", priority: 3},
    {href: "#menu", text: "Menu", priority: 1},
    {href: "#locations", text: "Locations", priority: 2},
    {href: "#contact", text: "Contact", priority: 10},
    {href: "/jobs", text: "Jobs", isRouterLink: true, priority: 5},
];
     */


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
            //element.style.scrollMarginTop = `${offsetHeight}px`; // Prefer scrollMarginTop for better support
            lenisScroll.scrollTo(element, scrollToOptions(offsetHeight));
            /*            element.scrollIntoView({
                            block: 'start',
                            behavior: 'smooth'
                        });*/
        }
    }


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
                            <div className={classes.menuIconWrapper} id={'menuIcon'} onClick={openMenu}><IoMenu
                                size={40}/></div>
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
                        <div className={classes.menuIconWrapper} id={'menuIcon'} onClick={openMenu}><IoMenu
                            size={40}/>
                        </div>
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