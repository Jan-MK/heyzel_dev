import {useRef} from 'react';
import classes from './Hero.module.scss';
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import Logo from "../Logo/Logo.jsx";
/*import drink from "../../assets/media/HeroImages/drink-1839134_1280.webp"*/
import drinkTn from "../../assets/media/HeroImages/drink-1839134_1280-tn.webp"
/*import woman from "../../assets/media/HeroImages/pexels-lisa-fotios-9853880.webp"*/
import womanTn from "../../assets/media/HeroImages/pexels-lisa-fotios-9853880-tn.webp"
/*import dark from "../../assets/media/HeroImages/dark-2595778_1280.webp"*/
import darkTn from "../../assets/media/HeroImages/dark-2595778_1280-tn.webp"
/*import coffeehouse from "../../assets/media/HeroImages/coffeehouse-2600877_1280.webp"*/
import coffeehouseTn from "../../assets/media/HeroImages/coffeehouse-2600877_1280-tn.webp"
/*import cShop from "../../assets/media/HeroImages/coffee-shop-393954_1280.webp"*/
import cShopTn from "../../assets/media/HeroImages/coffee-shop-393954_1280-tn.webp"
/*import coffee1 from "../../assets/media/HeroImages/coffee-5495609_1280.webp"*/
import coffee1Tn from "../../assets/media/HeroImages/coffee-5495609_1280-tn.webp"
/*import coffee2 from "../../assets/media/HeroImages/coffee-2439999_1280.webp"*/
import coffee2Tn from "../../assets/media/HeroImages/coffee-2439999_1280-tn.webp"
/*import cafe1 from "../../assets/media/HeroImages/cafe-1869656_1280.webp"*/
import cafe1Tn from "../../assets/media/HeroImages/cafe-1869656_1280-tn.webp"
/*import cafe2 from "../../assets/media/HeroImages/cafe-789635_1280.webp"*/
import cafe2Tn from "../../assets/media/HeroImages/cafe-789635_1280-tn.webp"
import ReactCountryFlag from "react-country-flag";
import {useWindowDimensions} from "../../context/WindowDimensionsContext.jsx";
import {maxWidthMobile, minWidthTablet} from "../../utility/Vars.jsx";
import {useLenis} from "@studio-freight/react-lenis";
import {useTranslation} from "react-i18next";
import BlurryLoadingImage from "../Image/BlurryLoadingImage.jsx";

gsap.registerPlugin(ScrollTrigger);


/*let images = [
    drink,
    woman,
    dark,
    coffeehouse,
    cShop,
    coffee1,
    coffee2,
    cafe1,
    cafe2,
]*/

/*let images = [
    [drink, drinkTn],
    [woman, womanTn],
    [dark, darkTn],
    [coffeehouse, coffeehouseTn],
    [cShop, cShopTn],
    [coffee1, coffee1Tn],
    [coffee2, coffee2Tn],
    [cafe1, cafe1Tn],
    [cafe2, cafe2Tn],
]*/
let countPerColumn = 3


function HeroComponent() {
    const {t, i18n} = useTranslation();
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


    let images2 = [
        ["/assets/media/HeroImages/drink-1839134_1280.webp", drinkTn],
        ["/assets/media/HeroImages/pexels-lisa-fotios-9853880.webp", womanTn],
        ["/assets/media/HeroImages/dark-2595778_1280.webp", darkTn],
        ["/assets/media/HeroImages/coffeehouse-2600877_1280.webp", coffeehouseTn],
        ["/assets/media/HeroImages/coffee-shop-393954_1280.webp", cShopTn],
        ["/assets/media/HeroImages/coffee-5495609_1280.webp", coffee1Tn],
        ["/assets/media/HeroImages/coffee-2439999_1280.webp", coffee2Tn],
        ["/assets/media/HeroImages/cafe-1869656_1280.webp", cafe1Tn],
        ["/assets/media/HeroImages/cafe-789635_1280.webp", cafe2Tn],
    ]
    const rightSlice = images2.slice(countPerColumn)


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
            const trigger = {
                trigger: heroContainer,
                start: 'center center',
                end: "bottom top",
                scrub: 1,
            }



            mm.add(`(min-width: ${minWidthTablet}px)`, () => {
                gsap.from(`.${classes.heroImages}`, .15, {
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                    scale: 1,
                    ease: "power2.inOut"
                })
                gsap.from(`.${classes.hero}`, .15, {
                    opacity: 0,
                    ease: "power2.inOut"
                })
                gsap.to(leftColumn, {yPercent: -20, scrollTrigger: trigger});
                gsap.to(rightColumn, {yPercent: -15, scrollTrigger: trigger});
            })
            mm.add(`(max-width: ${maxWidthMobile}px)`, () => {
                gsap.from(`.${classes.textContent}`, .15, {
                    opacity: 0,
                    ease: "power2.inOut",
                })
                gsap.to(leftColumn, {xPercent: 10, scrollTrigger: trigger});
                gsap.to(rightColumn, {xPercent: -5, scrollTrigger: trigger});
            })
        }
    })

    return (
        <div className={classes.heroWrapper} id={'hero'} ref={heroWrapper}>
            <div className={`${classes.heroImages}`}>
                <div className={`${classes.imageArray} ${classes.left}`} id={'leftHeroContainer'}
                     ref={leftContainer}>
                    {images2.map((image, idx) => {
                        return <div className={classes.imageContainer} key={idx}>
                            {/*<img
                                    loading="lazy"
                                    className={classes.heroImage}
                                     src={image[0]}
                                     alt={idx}/>*/}
                            <BlurryLoadingImage
                                lazy={false}
                                alt={`Heyzel-Coffee-HeroImage${idx}`}
                                preview={image[1]}
                                image={image[0]}
                                objFit={"cover"}
                                imageStyleClass={classes.heroImage}
                            />
                        </div>
                    })}
                </div>
                <div className={`${classes.imageArray} ${classes.right}`} id={'rightHeroContainer'}
                     ref={rightContainer}>
                    {rightSlice.map((image, idx) => {
                        return <div className={classes.imageContainer} key={idx}>
                            {/*<img loading="lazy"
                                     className={classes.heroImage}
                                     src={image[0]}
                                     alt={idx}/>*/}
                            <BlurryLoadingImage
                                lazy={false}
                                alt={`Heyzel-Coffee-HeroImage${idx}`}
                                preview={image[1]}
                                image={image[0]}
                                objFit={"cover"}
                                imageStyleClass={classes.heroImage}
                            />
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
                            onClick={() => i18n.changeLanguage(i18n.resolvedLanguage === 'en' ? 'de' : 'en')}>
                        {t('general.switch')}
                        <ReactCountryFlag svg style={{width: '25px', height: 'auto'}}
                                          aria-label={i18n.resolvedLanguage === 'en' ? 'Language German' : 'Language English'}
                                          countryCode={i18n.resolvedLanguage === 'en' ? 'DE' : 'GB'}/>
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
/*
import {useRef} from 'react';
import classes from './Hero.module.scss';
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import Logo from "../Logo/Logo.jsx";
import drink from "../../assets/media/HeroImages/drink-1839134_1280.webp"
import drinkTn from "../../assets/media/HeroImages/drink-1839134_1280-tn.webp"
import woman from "../../assets/media/HeroImages/pexels-lisa-fotios-9853880.webp"
import womanTn from "../../assets/media/HeroImages/pexels-lisa-fotios-9853880-tn.webp"
import dark from "../../assets/media/HeroImages/dark-2595778_1280.webp"
import darkTn from "../../assets/media/HeroImages/dark-2595778_1280-tn.webp"
import coffeehouse from "../../assets/media/HeroImages/coffeehouse-2600877_1280.webp"
import coffeehouseTn from "../../assets/media/HeroImages/coffeehouse-2600877_1280-tn.webp"
import cShop from "../../assets/media/HeroImages/coffee-shop-393954_1280.webp"
import cShopTn from "../../assets/media/HeroImages/coffee-shop-393954_1280-tn.webp"
import coffee1 from "../../assets/media/HeroImages/coffee-5495609_1280.webp"
import coffee1Tn from "../../assets/media/HeroImages/coffee-5495609_1280-tn.webp"
import coffee2 from "../../assets/media/HeroImages/coffee-2439999_1280.webp"
import coffee2Tn from "../../assets/media/HeroImages/coffee-2439999_1280-tn.webp"
import cafe1 from "../../assets/media/HeroImages/cafe-1869656_1280.webp"
import cafe1Tn from "../../assets/media/HeroImages/cafe-1869656_1280-tn.webp"
import cafe2 from "../../assets/media/HeroImages/cafe-789635_1280.webp"
import cafe2Tn from "../../assets/media/HeroImages/cafe-789635_1280-tn.webp"
import ReactCountryFlag from "react-country-flag";
import {useWindowDimensions} from "../../context/WindowDimensionsContext.jsx";
import {maxWidthMobile, minWidthTablet} from "../../utility/Vars.jsx";
import {useLenis} from "@studio-freight/react-lenis";
import {useTranslation} from "react-i18next";
import Image from "../Image/Image.jsx";

gsap.registerPlugin(ScrollTrigger);


let images = [
    [drink, drinkTn],
    [woman, womanTn],
    [dark, darkTn],
    [coffeehouse, coffeehouseTn],
    [cShop, cShopTn],
    [coffee1, coffee1Tn],
    [coffee2, coffee2Tn],
    [cafe1, cafe1Tn],
    [cafe2, cafe2Tn],
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
                /!*                tl.add(gsap.from(`.${classes.hero}`, .5, {
                                    opacity: 0,
                                    ease: "power2.inOut"
                                }))*!/
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
                            <Image
                                src={image[0]}
                                placeholderSrc={image[1]}
                                alt={`Heyzel-coffee-hero${idx}`}
                                classes={classes.heroImage}
                                height={500}
                                width={400}
                            />
                            {/!*                                <img
                                    loading="lazy"
                                    className={classes.heroImage}
                                     src={image}
                                     alt={idx}/>*!/}
                        </div>
                    })}
                </div>
                <div className={`${classes.imageArray} ${classes.right}`} id={'rightHeroContainer'}
                     ref={rightContainer}>
                    {rightSlice.map((image, idx) => {
                        return <div className={classes.imageContainer} key={idx}>
                            <Image
                                src={image[0]}
                                placeholderSrc={image[1]}
                                alt={`Heyzel-coffee-hero${idx}`}
                                classes={classes.heroImage}
                                height={500}
                                width={400}
                            />
                            {/!*                                <img loading="lazy"
                                     className={classes.heroImage}
                                     src={image}
                                     alt={idx}/>*!/}
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
*/
