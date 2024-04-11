import classes from "./About.module.scss"
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import shopTn from "../../assets/media/about/heyzel-shop-tn.webp"
import substainableTn from "../../assets/media/about/sustainable-cups-tn.webp"
import heartTn from "../../assets/media/about/with-love-tn.webp"
import {Trans, useTranslation} from "react-i18next";
import {useWindowDimensions} from "../../context/WindowDimensionsContext.jsx";
import {minWidthTablet} from "../../utility/Vars.jsx";
import BlurryLoadingImage from "../Image/BlurryLoadingImage.jsx";
import Icon from "../Icons/Icon.jsx";

gsap.registerPlugin(ScrollTrigger);

function About(props) {
    const {t} = useTranslation()
    const {isSmartphone, isTablet} = useWindowDimensions()

    useGSAP(() => {
        if(isSmartphone) return 0;
        const container = document.getElementById("about");
        const wrapper = document.getElementById('aboutWrapper')
        const outro = document.getElementById('aboutOutro')
        const insertionBlock = document.getElementById('insertionBlock1')

        const sections = gsap.utils.toArray("section", container);
        const mask = document.getElementById("aboutMask")

        let startPin = "top top+=66px"
        let endDistance = "+=2500"
        let pinAnchor = container
        let matchMedia = gsap.matchMedia()
        if (isTablet) {
            pinAnchor = wrapper
            startPin = `top+=${wrapper.offsetTop} top+=64px`
        }


        matchMedia.add(`(min-width: ${minWidthTablet}px)`, () => {
            let scrollTween = gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    pin: true,
                    pinSpacer: false,
                    trigger: container,
                    start: startPin,
                    scrub: 1,
                    end: endDistance,
                    markers: false,
                    onUpdate: (self) => {
                        mask.style.width = Math.min(self.progress * 100, 100) + "%";
                    }
                }
            });


            let scrollTween3 = gsap.from(outro, {
                opacity: 0,
                scrollTrigger: {
                    trigger: insertionBlock,
                    start: "center bottom",
                    end: "+=25",
                    scrub: 1,
                }
            })
        })

    })

    let shop = "assets/media/about/heyzel-shop.webp"
    let substainable = "assets/media/about/sustainable-cups.webp"
    let heart = "assets/media/about/with-love.webp"

    return (
        <>
            <div className={classes.aboutSectionContainer}>
                <h1>
                    {t('menu.about')}
                </h1>
                <div className={classes.textContainer}>
                    <p>{t('about.dscr1')}</p>
                    <p>{t('about.dscr2')}</p>
                </div>
                <div id={"aboutWrapper"} className={classes.aboutWrapper}>

                    {!isSmartphone && <div className={classes.timeLine}>
                        <svg viewBox="0 0 900 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.89998 6C9.43671 8.28224 7.41896 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.41896 0 9.43671 1.71776 9.89998 4H445.1C445.563 1.71776 447.581 0 450 0C452.419 0 454.437 1.71776 454.9 4H890.1C890.563 1.71776 892.581 0 895 0C897.761 0 900 2.23858 900 5C900 7.76142 897.761 10 895 10C892.581 10 890.563 8.28224 890.1 6H454.9C454.437 8.28224 452.419 10 450 10C447.581 10 445.563 8.28224 445.1 6H9.89998Z"/>
                            <mask id="mask0_0_1" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="0" y="0"
                                  width="900"
                                  height="10">
                                <path
                                    d="M9.89998 6C9.43671 8.28224 7.41896 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.41896 0 9.43671 1.71776 9.89998 4H445.1C445.563 1.71776 447.581 0 450 0C452.419 0 454.437 1.71776 454.9 4H890.1C890.563 1.71776 892.581 0 895 0C897.761 0 900 2.23858 900 5C900 7.76142 897.761 10 895 10C892.581 10 890.563 8.28224 890.1 6H454.9C454.437 8.28224 452.419 10 450 10C447.581 10 445.563 8.28224 445.1 6H9.89998Z"/>
                            </mask>
                            <g mask="url(#mask0_0_1)">
                                <rect id={"aboutMask"} className={classes.mask} y="-49" height="99"/>
                            </g>
                        </svg>
                    </div>}
                    <div id={"aboutContainer"} className={`${classes.aboutContainer} ${classes.scrollx}`}>
                        <section className={`${classes.sec1} ${classes.pin}`}>
                            <div className={classes.col}>
                                <div className={classes.photo}>
{/*                                    <img
                                        loading="lazy"
                                        alt={t('cardMenu.day.title')}
                                        src={shop}/>*/}
                                    <BlurryLoadingImage
                                    alt={t('cardMenu.day.title')}
                                    preview={shopTn}
                                    image={shop}
                                    />
                                </div>
                                <div className={classes.text}>
                                    <div>
                                        <span>{t('about.card1.subtitle')}</span>
                                        <h2>
                                            <Trans i18nKey="about.card1.title">
                                                COFFEE<span className={classes.highlight}>LOVE</span>!
                                            </Trans>
                                        </h2>
                                    </div>
                                    <p>
                                        <Trans i18nKey="about.card1.dscr">
                                            part1<br/><br/>part2
                                        </Trans>
                                    </p>
                                </div>
                            </div>
                        </section>
                        <section className={`${classes.sec2} ${classes.pin}`}>

                            <div className={classes.col}>
                                <div className={classes.photo}>
                                    <BlurryLoadingImage
                                        alt={t('cardMenu.day.title')}
                                        preview={substainableTn}
                                        image={substainable}
                                    />
                                    {/*<img
                                        loading="lazy"
                                        alt={t('cardMenu.day.title')}
                                        src={substainable}/>*/}
                                </div>
                                <div className={classes.text}>
                                    <div>
                                        <span>{t('about.card2.subtitle')}</span>
                                        <h2>
                                            <Trans i18nKey="about.card2.title">
                                                very <span className={classes.highlight}>sustainable</span>!
                                            </Trans>
                                        </h2>
                                    </div>
                                    <p>{t('about.card2.dscr')}</p>
                                </div>
                            </div>
                        </section>
                        <section className={`${classes.sec3} ${classes.pin}`}>

                            <div className={classes.col}>
                                <div className={classes.photo}>
                                    <BlurryLoadingImage
                                        alt={t('cardMenu.day.title')}
                                        preview={heartTn}
                                        image={heart}
                                    />
                                    {/*<img
                                        loading="lazy"
                                        alt={t('cardMenu.day.title')}
                                        src={heart}/>*/}
                                </div>
                                <div className={classes.text}>
                                    <div>
                                        <span>{t('about.card3.subtitle')}</span>
                                        <h2>
                                            <Trans i18nKey="about.card3.title">
                                                YOUR <span className={classes.highlight}> DAY MAKERS</span>!
                                            </Trans>
                                        </h2>
                                    </div>
                                    <p>{t('about.card3.dscr')}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <p id={"aboutOutro"} className={classes.outro}>{t('about.after')}</p>

            </div>
        </>
    );
}

export default About;