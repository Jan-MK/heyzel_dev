import React, {useContext, useEffect, useRef, useState} from 'react';
import classes from './Hero.module.scss'; // Make sure the path matches your file structure
import coffeeImg from '../../assets/coffees.jpg'; // Update the path to your image
import Splitting from 'splitting';
import 'splitting/dist/splitting.css'; // Import Splitting.js CSS
import 'splitting/dist/splitting-cells.css'; // For cell effect
import logo from '../../assets/heyzel-logo.svg'
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import NavbarContext from "../../context/NavbarContext.jsx";
import Logo from "../Logo/Logo.jsx";

gsap.registerPlugin(ScrollTrigger);

/*
const menu = [
    {
        title: 'This is Heyzel',
        subtitle: 'our concept',
        link: `#`
    },
    {
        title: 'Menu',
        subtitle: 'Enjoy',
        link: `#`
    },
    {
        title: 'Events',
        subtitle: `Join us, you'll love it`,
        link: `#`
    },
    {
        title: `Locations`,
        subtitle: `3x in Augsburg`,
        link: `#`
    },
    {
        title: `Contact`,
        subtitle: `get in touch with us`,
        link: `#`
    },
    {
        title: `Jobs`,
        subtitle: `Apply now`,
        link: `/jobs`
    },
]


const randomColors = ['#68c1c9', '#ffd400', '#fb1d36', '#9697c0', '#00c5d1', '#ef6dff', '#70BAFF', '#FE0879']

const HeroComponent = () => {
    const heroRef = useRef(null);
    const heroMedia = useRef(null);
    const heroTitlesRef = useRef([]);
    const heroSubtitlesRef = useRef([]);
    const heroSeparatorsRef = useRef([]);


    useEffect(() => {
        const target = document.getElementById('heroImage')
        const result = Splitting({
            target: target,
            by: 'cells',
            image: true,
            cols: 1,
            rows: 6
        })
        console.log(result)
        // GSAP animations
        gsap.set(heroTitlesRef.current, {y: '200%'});
        gsap.set(heroSubtitlesRef.current, {autoAlpha: 0});
        gsap.set(heroSeparatorsRef.current, {width: 0});

        const tl = gsap.timeline({defaults: {ease: 'expo.out'}})
            .to(heroTitlesRef.current, {
                duration: 1.75,
                y: 0,
                stagger: 0.075,
            })
            .to(heroSubtitlesRef.current, {
                duration: 1,
                autoAlpha: 1,
                stagger: 0.075,
            }, "-=1.5") // Adjust timing as needed
            .to(heroSeparatorsRef.current, {
                duration: 1.75,
                width: '100%',
                stagger: 0.095,
            }, "-=1.75").fromTo(
                '.cell',
                {
                    height: '0',
                    /!*width: '0',*!/
                    scale: .75,
                }, {
                    duration: .75,
                    height: '100%',
                    /!*width: '100%',*!/
                    scale: 1,
                    stagger: 0.05,
                    ease: 'expo.out',
                }, .5
            )
    }, []);

    // Helper function to add refs dynamically
    const addToRefs = (el, refArray) => {
        if (el && !refArray.current.includes(el)) {
            refArray.current.push(el);
        }
    };


    return (
        <div className={classes.hero}>
            <div className={classes.heroWrapper}>
                <div className={classes.heroMedia} id={"heroImage"}>
                    {/!*<figure className={classes.heroFigure}>
                        <img className={classes.heroImage} src={coffeeImg} alt="Coffee"/>
                    </figure>*!/}
                </div>
                <div className={classes.heroMedia}>
                    <div className={classes.overlay}></div>
                </div>
                {
                    menu.map((element, idx) => {
                        return (<div className={classes.heroRow} key={idx}>
                            <div className={classes.heroRowText}>
                                <h1 ref={el => addToRefs(el, heroTitlesRef)}>{element.title}</h1>
                                <h4 ref={el => addToRefs(el, heroSubtitlesRef)}>{element.subtitle}</h4>
                            </div>
                            {idx < menu.length - 1 &&
                                <div
                                    className={classes.heroRowSeparator}
                                    ref={el => addToRefs(el, heroSeparatorsRef)}></div>
                            }
                        </div>)
                    })
                }
            </div>
        </div>
    );
};*/

let images = [
    "https://cdn.pixabay.com/photo/2016/11/19/12/54/drink-1839134_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/12/54/cafe-1869656_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/08/17/14/37/coffee-5495609_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/09/14/18/32/cafe-7454951_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/09/17/12/41/cafe-5579069_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/07/15/13/36/coffee-shop-393954_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/08/02/00/05/places-2568876_1280.jpg"
]
let countPerColumn = 3

function HeroComponent(props) {
    const leftContainer = useRef(null)
    const rightContainer = useRef(null)
    const containerRef = useRef(null)
    const heroWrapper = useRef(null)
    const {navbarRef, logoRef} = useContext(NavbarContext)
    const [heroHeight, setHeroHeight] = useState("100vh")

    const rightSlice = images.slice(countPerColumn)

    /*    useEffect(() => {
            const navbar = navbarRef.current;

            if (navbar) {
                // Function to update height
                const updateHeight = () => {
                    setHeroHeight(`calc(100vh - ${navbar.offsetHeight}px)`);
                };

                // Initial update
                updateHeight();

                // Create a Resize Observer to watch for size changes
                const resizeObserver = new ResizeObserver(entries => {
                    for (let entry of entries) {
                        updateHeight();
                    }
                });

                // Start observing the navbar
                resizeObserver.observe(navbar);

                // Cleanup function to stop observing when component unmounts or navbar changes
                return () => resizeObserver.unobserve(navbar);
            }
        }, [navbarRef]);*/

    /*    useEffect(() => {
            let heroKu = heroWrapper.current.offsetHeight;
            let NAVI = navbarRef.current.offsetHeight;
            let win = window.innerHeight;
            if (navbarRef) {
                setHeroHeight(`calc(100vh - ${navbarRef.current.offsetHeight}px`)
                console.log("heroWrapper: ", heroKu, " | Navi: ", NAVI, " | together", (heroKu + NAVI), " | winInner: ", win)
            } else {
                console.log("heroWrapper: ", heroKu, " | Navi: ", NAVI, " | together", (heroKu + NAVI), " | winInner: ", win)
                setHeroHeight('100vh')
            }

        }, [navbarRef]);*/

    function handleScrollDownClick(e) {
        e.preventDefault()
        navbarRef.current?.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        })
    }

    useGSAP(() => {
        const leftColumn = leftContainer.current
        const rightColumn = rightContainer.current
        const heroContainer = heroWrapper.current

        gsap.to([leftColumn], {
            y: -heroContainer.offsetHeight * 0.75,
            scrollTrigger: {
                trigger: heroContainer,
                start: 'center center',
                end: "bottom top",
                markers: false,
                scrub: 1,
            }
        })
        gsap.to([rightColumn], {
            y: -heroContainer.offsetHeight * 0.55,
            scrollTrigger: {
                trigger: heroContainer,
                start: 'center center',
                end: "bottom top",
                markers: false,
                scrub: 1,
            }
        })

    })

    return (
        <div className={classes.heroWrapper} ref={heroWrapper} style={{height: heroHeight}}>
            <div className={`${classes.heroImages}`} style={{height: heroHeight}}>
                <div className={`${classes.imageArray} ${classes.left}`} ref={leftContainer}>
                    {images.map((image, idx) => {
                        return <div className={classes.imageContainer} key={idx}>
                            <img className={classes.heroImage}
                                 src={image}
                                 alt={idx}/>
                        </div>
                    })}
                </div>
                <div className={`${classes.imageArray} ${classes.right}`} ref={rightContainer}>
                    {rightSlice.map((image, idx) => {
                        return <div className={classes.imageContainer} key={idx}>
                            <img className={classes.heroImage}
                                 src={image}
                                 alt={idx}/>
                        </div>
                    })}
                </div>
            </div>
            <div className={`${classes.hero} container`} ref={containerRef}>
                <div className={`${classes.textContent}`}>
                    <div className={classes.headLine}>
                        <div className={classes.logoWrapper}>
                            <Logo width={"100%"} />
                        </div>
                        <p>A <span>unique</span> vibe</p>
                    </div>
                    <p>Good talks, working between meetings, pre-party at night - we've got you!</p>
                    <button className={`${classes.asdf} secondary`}>Discover</button>
                </div>
            </div>
            <div className={classes.scrollIconContainer}>
                <a href={"#home"} onClick={handleScrollDownClick} className={classes.scroll}></a>
            </div>

        </div>
    )
}

export default HeroComponent;
