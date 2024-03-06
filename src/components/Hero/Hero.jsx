import {useContext, useRef, useState} from 'react';
import classes from './Hero.module.scss'; // Make sure the path matches your file structure
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import ReferenceContext from "../../context/ReferenceContext.jsx";
import Logo from "../Logo/Logo.jsx";
import {maxWidthMobile, minWidthNonMobile} from "../../utility/Utility.jsx";
import drink from "../../assets/media/HeroImages/drink-1839134_1280.jpg"
import woman from "../../assets/media/HeroImages/woman-6992691_1280.jpg"
import dark from "../../assets/media/HeroImages/dark-2595778_1280.jpg"
import coffeehouse from "../../assets/media/HeroImages/coffeehouse-2600877_1280.jpg"
import cShop from "../../assets/media/HeroImages/coffee-shop-393954_1280.jpg"
import coffee1 from "../../assets/media/HeroImages/coffee-5495609_1280.jpg"
import coffee2 from "../../assets/media/HeroImages/coffee-2439999_1280.jpg"
import cafe1 from "../../assets/media/HeroImages/cafe-1869656_1280.jpg"
import cafe2 from "../../assets/media/HeroImages/cafe-789635_1280.jpg"
import ReactCountryFlag from "react-country-flag";

gsap.registerPlugin(ScrollTrigger);


let images = [
    drink,
    woman,
    dark,
    coffeehouse,
    cShop,
    coffee1,
    coffee2,
    cafe1,
    cafe2,
]
let countPerColumn = 3

function HeroComponent(props) {
    const leftContainer = useRef(null)
    const rightContainer = useRef(null)
    const containerRef = useRef(null)
    const heroWrapper = useRef(null)
    const {navbarRef} = useContext(ReferenceContext)
    const [heroHeight, setHeroHeight] = useState("100svh")

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
        <div className={classes.heroWrapper} id={'hero'} ref={heroWrapper} style={{height: heroHeight}}>
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
