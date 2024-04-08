import classes from "./Home.module.scss"
import Hero from "../components/Hero/Hero.jsx";
import {useContext, useEffect, useRef, Suspense, lazy, useLayoutEffect} from "react";
import ReferenceContext from "../context/ReferenceContext.jsx";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {getDistinctRandomHex} from "../utility/Utility.jsx";
import {useParams} from 'react-router-dom';
import {useModal} from '../context/ModalContext';
import Navbar from "../components/Navigation/Navbar.jsx";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";
/*import About from "../components/About/About.jsx";
import InsertionBlock from "../components/InsertionBlock/InsertionBlock.jsx";
import Locations from "../components/Locations/Locations.jsx";
import Menu from "../components/Menu/Menu.jsx";
import Footer from "../components/Footer/Footer.jsx";
import LegalModal from "../components/LegalModal/LegalModal.jsx";*/

const About = lazy(() => import ("../components/About/About.jsx"));
const InsertionBlock = lazy(() => import ("../components/InsertionBlock/InsertionBlock.jsx"));
const Locations = lazy(() => import ("../components/Locations/Locations.jsx"));
const Menu = lazy(() => import ("../components/Menu/Menu.jsx"));
const Footer = lazy(() => import ("../components/Footer/Footer.jsx"));
const LegalModal = lazy(() => import ("../components/LegalModal/LegalModal.jsx"));
const Contact = lazy(() => import("../components/Contact/Contact.jsx"))
const Events = lazy(() => import("../components/Events/Events.jsx"))

import Loading from "../components/Loading/Loading.jsx";
import {useLenis} from "@studio-freight/react-lenis";
import i18next from "i18next";


gsap.registerPlugin(ScrollTrigger);
<Helmet>

</Helmet>

function Home() {
    const {t, i18n} = useTranslation();
    const {menuContainerRef} = useContext(ReferenceContext)
    const {modalId} = useParams();
    const {openModal, paramOnClose} = useModal();
    const lenisScroll = useLenis()

    let insertionTitle = "heyzeln"
    let insertionSubTitle = "[hɛɨzɫɲ / ˈheɪzəln]"
    let insertionIntro = "Definition:"
    let insertions = [
        {
            de: "Mit Freunden einen Pfirsich-Eistee auf dem Rathausplatz trinken.",
            en: "Hanging out with friends, sipping on a peach iced tea at Rathausplatz."
        },
        {
            de: "Mit einem Kaffee oder Caramelito in den Tag starten.",
            en: "Kicking off the day with a coffee or a Caramelito."
        }, {
            de: "Das Wochenende mit Frozen Margaritas einläuten.",
            en: "Starting the weekend with Frozen Margaritas."
        }, {
            de: "Vor dem Feiern den DJs lauschen mit der Partycrew und einem Long Island vorglühen.",
            en: "Warming up for the night with the party crew, listening to DJs, and having a Long Island."
        }, {
            de: "Mitten in Augsburg in einem nicen Café abhängen.",
            en: "Chilling in a cool café right in the heart of Augsburg."
        }, {
            de: "Bei einem Motivations Mango Lassi lernen, besprechen oder arbeiten.",
            en: "Studying, chatting, or working over a Motivation Mango Lassi."
        }, {
            de: "Beim ersten Rendezvous sein Date auf einen Iced Cappuccino einladen.",
            en: "Inviting your date for an Iced Cappuccino on your first meetup."
        }, {
            de: "Auf dem Weg in die Arbeit noch einen Couscous Salat snacken.",
            en: "Grabbing a Couscous Salad snack on the way to work."
        }
    ]

    let colors = getDistinctRandomHex(4)
    const scrollToOptions = (offsetHeight) => ({
        offset: -offsetHeight,
        duration: 1.5,
        easing: (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
        immediate: false,
        lock: false,
        force: false,
    });
    function handleNavigation(id) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
        }
    }

    useEffect(() => {
        // Mapping object for modalIds to language and location
        const modalIdMapping = {
            'about': { language: 'en', location: 'about' },
            'ueber': { language: 'de', location: 'about' },
            'events': { location: 'events' },
            'speisekarte': { language: 'de', location: 'menu' },
            'menu': { language: 'en', location: 'menu' },
            'locations': { language: 'en', location: 'locations' },
            'standorte': { language: 'de', location: 'locations' },
            'contact': { language: 'en', location: 'contact' },
            'kontakt': { language: 'de', location: 'contact' }
        };

        if (modalId && modalIdMapping[modalId]) {
            const { language, location } = modalIdMapping[modalId];
            if (language) {
                i18n.changeLanguage(language);
            }

            setTimeout(() => {
                handleNavigation(location);
            }, 500);
        }
    }, [modalId, i18n]);

    // Routing leads to heyzel.de/imprint or else to open a proper modal. The race condition is eliminated of
    // opening again since state is not updated in this short amount.
    useEffect(() => {
        if (modalId && !paramOnClose && openModal) {
            switch (modalId) {
                case 'imprint': {
                    openModal(<LegalModal showImprint={true}/>, true);
                    break;
                }
                case 'privacy': {
                    openModal(<LegalModal showImprint={false}/>, true);
                    break;
                }
            }
        }
    }, [modalId, openModal]);


    return (
        <>
            <Hero/>
            <Navbar/>
            <main className={`${classes.mainContent}`} id={"home"}>
                <section className={`${classes.contentSection} `} id={"about"}>
                    <div className={`${classes.bgSectionHeading} ${classes.centered} container`}>

                        <Suspense fallback={<Loading/>}>
                            <About/>
                        </Suspense>
                    </div>
                </section>
                <Suspense fallback={<Loading/>}>
                    <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle}
                                    order={false}
                                    boldIntro={insertionIntro} idx={1}
                                    description={[insertions[0][i18n.resolvedLanguage], insertions[1][i18n.resolvedLanguage]]}
                                    bg={colors[0].bg} text={colors[0].text}/>
                </Suspense>
                <section className={`${classes.contentSection}`} id={"events"}>
                    <div className={`${classes.bgSectionHeading} ${classes.centered}`}>
                        <h1>
                            {t('menu.events')}
                        </h1>
                        <Suspense fallback={<Loading/>}>
                            <Events/>
                        </Suspense>
                    </div>
                </section>
                <Suspense fallback={<Loading/>}>
                    <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle}
                                    order={true} boldIntro={"..."}
                                    idx={3}
                                    description={[insertions[2][i18n.resolvedLanguage], insertions[3][i18n.resolvedLanguage]]}
                                    bg={colors[1].bg}
                                    text={colors[1].text}/>
                </Suspense>
                <section className={`${classes.contentSection} ${classes.imageOverlay} ${classes.fullHeight}`}
                         ref={menuContainerRef} id={"menu"}>
                    <Suspense fallback={<Loading/>}>
                        <Menu/>
                    </Suspense>
                </section>
                <Suspense fallback={<Loading/>}>
                    <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle}
                                    order={false} boldIntro={"..."}
                                    idx={5}
                                    description={[insertions[4][i18n.resolvedLanguage], insertions[5][i18n.resolvedLanguage]]}
                                    bg={colors[2].bg}
                                    text={colors[2].text}/>
                </Suspense>
                <section className={`${classes.contentSection}`} id={"locations"}>
                    <Suspense fallback={<Loading/>}>
                        <Locations/>
                    </Suspense>
                </section>
                <Suspense fallback={<Loading/>}>
                    <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle}
                                    order={true} boldIntro={"..."}
                                    idx={7}
                                    description={[insertions[6][i18n.resolvedLanguage], insertions[7][i18n.resolvedLanguage]]}
                                    bg={colors[3].bg}
                                    text={colors[3].text}/>
                </Suspense>


                <section className={`${classes.contentSection}`} id={"contact"}>
                    <div className={`${classes.bgSectionHeading} ${classes.centered}`}>
                        <h1>{t('menu.contact')}</h1>
                    </div>
                    <Suspense fallback={<Loading/>}>
                        <Contact/>
                    </Suspense>
                </section>
            </main>
            <Suspense fallback={<Loading/>}>
                <Footer/>
            </Suspense>
        </>
    );
}

export default Home;