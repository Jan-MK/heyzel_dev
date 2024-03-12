import classes from "./Home.module.scss"
import Menu from "../components/Menu/Menu.jsx";
import Hero from "../components/Hero/Hero.jsx";
import {useContext, useEffect, useRef} from "react";
import ReferenceContext from "../context/ReferenceContext.jsx";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Footer from "../components/Footer/Footer.jsx";
import InsertionBlock from "../components/InsertionBlock/InsertionBlock.jsx";
import Contact from "../components/Contact/Contact.jsx";
import {getDistinctRandomHex} from "../utility/Utility.jsx";
import {useParams} from 'react-router-dom';
import {useModal} from '../context/ModalContext';
import LegalModal from '../components/LegalModal/LegalModal.jsx';
import Locations from "../components/Locations/Locations.jsx";
import Navbar from "../components/Navigation/Navbar.jsx";
import {useTranslation} from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

function Home() {
    const { t, i18n } = useTranslation();
    const aboutRef = useRef(null)
    const {menuContainerRef} = useContext(ReferenceContext)
    const {modalId} = useParams();
    const {openModal, paramOnClose} = useModal();

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


    // Routing leads to heyzel.de/imprint or else to open a proper modal. The race condition is eliminated of
    // opening again since state is not updated in this short amount.
    useEffect(() => {
        if (modalId && !paramOnClose) {
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
                <section className={`${classes.contentSection}`} id={"about"}>
                    <div className={`${classes.bgSectionHeading} ${classes.centered}`}>
                        <h1 ref={aboutRef}>
                            {t('menu.about')}
                        </h1>
                    </div>
                </section>
                <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle} order={false}
                                boldIntro={insertionIntro} idx={1}
                                description={[insertions[0][i18n.resolvedLanguage], insertions[1][i18n.resolvedLanguage]]}
                                bg={colors[0].bg} text={colors[0].text}/>
                <section className={`${classes.contentSection}`} id={"events"}>
                    <div className={`${classes.bgSectionHeading} ${classes.centered}`}>
                        <h1>
                            {t('menu.events')}
                        </h1>
                    </div>
                </section>
                <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle} order={true} boldIntro={"..."}
                                idx={3} description={[insertions[2][i18n.resolvedLanguage], insertions[3][i18n.resolvedLanguage]]} bg={colors[1].bg}
                                text={colors[1].text}/>
                <section className={`${classes.contentSection} ${classes.imageOverlay} ${classes.fullHeight}`}
                         ref={menuContainerRef}
                         id={"menu"}>
                    <Menu/>
                </section>
                <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle} order={false} boldIntro={"..."}
                                idx={5} description={[insertions[4][i18n.resolvedLanguage], insertions[5][i18n.resolvedLanguage]]} bg={colors[2].bg}
                                text={colors[2].text}/>
                <section className={`${classes.contentSection}`} id={"locations"}>
                    <Locations/>
                </section>
                <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle} order={true} boldIntro={"..."}
                                idx={7} description={[insertions[6][i18n.resolvedLanguage], insertions[7][i18n.resolvedLanguage]]} bg={colors[3].bg}
                                text={colors[3].text}/>
                <section className={`${classes.contentSection}`} id={"contact"}>
                    <div className={`${classes.bgSectionHeading} ${classes.centered}`}>
                        <h1>
                            {t('menu.contact')}
                        </h1>
                    </div>
                    <Contact/>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Home;