import React, {useContext, useEffect, useRef, useState} from 'react';
import classes from './Hero.module.scss'; // Make sure the path matches your file structure
import coffeeImg from '../../assets/media/coffees.jpg'; // Update the path to your image
import Splitting from 'splitting';
import 'splitting/dist/splitting.css'; // Import Splitting.js CSS
import 'splitting/dist/splitting-cells.css'; // For cell effect
import logo from '../../assets/media/heyzel-logo.svg'
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import NavbarContext from "../../context/NavbarContext.jsx";
import Logo from "../Logo/Logo.jsx";
import {getRandomColor, maxWidthMobile, minWidthNonMobile} from "../../utility/Utility.jsx";
import ReactCountryFlag from "react-country-flag";

gsap.registerPlugin(ScrollTrigger);


let images = [
    "https://cdn.pixabay.com/photo/2016/11/19/12/54/drink-1839134_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/12/54/cafe-1869656_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/08/17/14/37/coffee-5495609_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/09/14/18/32/cafe-7454951_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/09/17/12/41/cafe-5579069_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/07/15/13/36/coffee-shop-393954_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/08/02/00/05/places-2568876_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/05/16/21/45/coffee-2319107_1280.jpg"
]
let countPerColumn = 3

function HeroComponent(props) {
    const leftContainer = useRef(null)
    const rightContainer = useRef(null)
    const containerRef = useRef(null)
    const heroWrapper = useRef(null)
    const {navbarRef} = useContext(NavbarContext)
    const [heroHeight, setHeroHeight] = useState("100vh")

    const rightSlice = images.slice(countPerColumn)

    const randCol = "#FE0879"
    const borderColor = randCol
    const arrowColor = borderColor


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

        let mm = gsap.matchMedia()

        mm.add(`(min-width: ${minWidthNonMobile}px)`, () => {

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
        mm.add(`(max-width: ${maxWidthMobile}px)`, () => {
            gsap.to([leftColumn], {
                x: +heroContainer.offsetWidth * 0.75,
                scrollTrigger: {
                    trigger: heroContainer,
                    start: 'center center',
                    end: "bottom top",
                    markers: false,
                    scrub: 1,
                }
            })
            gsap.to([rightColumn], {
                x: -heroContainer.offsetWidth * 0.55,
                scrollTrigger: {
                    trigger: heroContainer,
                    start: 'center center',
                    end: "bottom top",
                    markers: false,
                    scrub: 1,
                }
            })
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
                            <Logo width={"100%"}/>
                        </div>
                        <p>A <span style={{color: randCol}}>unique</span> vibe</p>
                    </div>
                    <p>Good talks, working between meetings, pre-party at night - we've got you!</p>
                    <p>Switch to <span> </span> <ReactCountryFlag svg style={{ width: '25px', height: 'auto'}} countryCode={'DE'} /></p>
                </div>
            </div>
            <div className={classes.scrollIconContainer} style={{
                '--scroll-border-color': borderColor,
                '--scroll-arrow-color': arrowColor,
            }}>
                <a href={"#home"} onClick={handleScrollDownClick} className={classes.scroll}></a>
            </div>
            <div className={classes.overlay}></div>
        </div>
    )
}

export default HeroComponent;
