import {useRef} from 'react';
import classes from './Hero.module.scss';
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import Logo from "../Logo/Logo.jsx";
import drink from "../../assets/media/HeroImages/drink-1839134_1280.webp"
import woman from "../../assets/media/HeroImages/pexels-lisa-fotios-9853880.webp"
import dark from "../../assets/media/HeroImages/dark-2595778_1280.webp"
import coffeehouse from "../../assets/media/HeroImages/coffeehouse-2600877_1280.webp"
import cShop from "../../assets/media/HeroImages/coffee-shop-393954_1280.webp"
import coffee1 from "../../assets/media/HeroImages/coffee-5495609_1280.webp"
import coffee2 from "../../assets/media/HeroImages/coffee-2439999_1280.webp"
import cafe1 from "../../assets/media/HeroImages/cafe-1869656_1280.webp"
import cafe2 from "../../assets/media/HeroImages/cafe-789635_1280.webp"
import ReactCountryFlag from "react-country-flag";
import {useWindowDimensions} from "../../context/WindowDimensionsContext.jsx";
import {maxWidthMobile, minWidthTablet} from "../../utility/Vars.jsx";
import {useLenis} from "@studio-freight/react-lenis";
import {useTranslation} from "react-i18next";

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


function HeroComponent() {
    const { t, i18n } = useTranslation();
    const leftContainer = useRef(null)
    const rightContainer = useRef(null)
    const containerRef = useRef(null)
    const heroWrapper = useRef(null)
    const {isSmartphone} = useWindowDimensions()
    const lenisScroll = useLenis()
    const scrollToOptions = (offsetHeight) => ({
        offset: -offsetHeight,
        duration: 1,
        easing: (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
        immediate: false,
        lock: false,
        force: false,
    });
    const rightSlice = images.slice(countPerColumn)



    function handleScrollDownClick(e) {
        e.preventDefault();
        let element = document.getElementById('navBar');
        if (!element) return
        let offsetHeight = isSmartphone ? parseInt(element.style.marginTop.replace('px', '')) : 0;
        lenisScroll.scrollTo(element, scrollToOptions(offsetHeight));
    }

    useGSAP(() => {
        const leftColumn = document.getElementById('leftHeroContainer')
        const rightColumn = document.getElementById('rightHeroContainer')
        const heroContainer = document.getElementById('hero')

        let mm = gsap.matchMedia()
        if (leftColumn && rightColumn && heroContainer) {
            const tlLeft = gsap.timeline({
                scrollTrigger: {
                    trigger: heroContainer,
                    start: 'center center',
                    end: "bottom top",
                    scrub: 1,
                },
            });

            const tlRight = gsap.timeline({
                scrollTrigger: {
                    trigger: heroContainer,
                    start: 'center center',
                    end: "bottom top",
                    scrub: 1,
                },
            });


            mm.add(`(min-width: ${minWidthTablet}px)`, () => {
                let tl = gsap.timeline();
                tl.add(gsap.from(`.${classes.heroImages}`, 0.75, {
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                    scale: 1,
                    ease: "power2.inOut"
                }))
/*                tl.add(gsap.from(`.${classes.hero}`, .5, {
                    opacity: 0,
                    ease: "power2.inOut"
                }))*/
                tlLeft.to(leftColumn, {yPercent: -20});
                tlRight.to(rightColumn, {yPercent: -15});
            })
            mm.add(`(max-width: ${maxWidthMobile}px)`, () => {
                gsap.from(`.${classes.textContent}`, .5, {
                    opacity: 0,
                    delay: .5,
                    ease: "power2.inOut",
                })
                tlLeft.to(leftColumn, {xPercent: 10});
                tlRight.to(rightColumn, {xPercent: -5});
            })
        }
    })

    return (
            <div className={classes.heroWrapper} id={'hero'} ref={heroWrapper}>
                <div className={`${classes.heroImages}`}>
                    <div className={`${classes.imageArray} ${classes.left}`} id={'leftHeroContainer'}
                         ref={leftContainer}>
                        {images.map((image, idx) => {
                            return <div className={classes.imageContainer} key={idx}>
                                <img className={classes.heroImage}
                                     src={image}
                                     alt={idx}/>
                            </div>
                        })}
                    </div>
                    <div className={`${classes.imageArray} ${classes.right}`} id={'rightHeroContainer'}
                         ref={rightContainer}>
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
                            <p>A <span>unique</span> vibe</p>
                        </div>
                        <p>{t('hero.dscr')}</p>
                        <button className={'third'}
                                onClick={() => i18n.changeLanguage(i18n.resolvedLanguage === 'en' ? 'de' : 'en' )}>
                            {t('general.switch')}
                            <ReactCountryFlag svg style={{width: '25px', height: 'auto'}} aria-label={i18n.resolvedLanguage === 'en' ? 'Language German' : 'Language English'} countryCode={i18n.resolvedLanguage === 'en' ? 'DE' : 'GB' }/>
                        </button>
                    </div>
                </div>
                <div className={classes.scrollIconContainer} onClick={handleScrollDownClick}>
                    <div className={classes.scroll}></div>
                </div>
                {isSmartphone && <div className={classes.overlay}></div>}
            </div>
    )
}

export default HeroComponent;
