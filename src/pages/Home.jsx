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
import {useWindowDimensions} from "../context/WindowDimensionsContext.jsx";
import {useMobileMenu} from "../context/MobileMenuContext.jsx";
import NavbarOld from "../RECYCLED/NavbarOld.jsx";

gsap.registerPlugin(ScrollTrigger);

function Home() {
    const aboutRef = useRef(null)
    const {menuContainerRef} = useContext(ReferenceContext)
    const {modalId} = useParams();
    const {openModal, paramOnClose} = useModal();
    const {isSmartphone} = useWindowDimensions()
    const {openMenu} = useMobileMenu()

    let insertionTitle = "heyzeln"
    let insertionSubTitle = "[hɛɨzɫɲ / ˈheɪzəln]"
    let insertionIntro = "Definition:"
    let insertions = [
        "Mit Freunden einen Pfirsich-Eistee auf dem Rathausplatz trinken.",
        "Mit einem Kaffee oder Caramelito in den Tag starten.",
        "Das Wochenende mit Frozen Margaritas einläuten.",
        "Vor dem Feiern den DJs lauschen mit der Partycrew und einem Long Island vorglühen.",
        "Mitten in Augsburg in einem nicen Café abhängen.",
        "Bei einem Motivations Mango Lassi lernen, besprechen oder arbeiten.",
        "Beim ersten Rendezvous sein Date auf einen Iced Cappuccino einladen.",
        "Auf dem Weg in die Arbeit noch einen Couscous Salat snacken."
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
        // Add more conditions for other modals as needed
    }, [modalId, openModal]);


    return (
        <>
            <Hero/>
            <Navbar/>
            <main className={`${classes.mainContent}`} id={"home"}>
                <section className={`${classes.contentSection}`} id={"about"}>
                    <div className={`${classes.bgSectionHeading} ${classes.centered}`}>
                        <h1 ref={aboutRef}>
                            ABOUT
                        </h1>
                    </div>
                </section>
                <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle} order={false}
                                boldIntro={insertionIntro} idx={1} description={[insertions[0], insertions[1]]}
                                bg={colors[0].bg} text={colors[0].text}/>
                <section className={`${classes.contentSection}`} id={"events"}>
                    <div className={`${classes.bgSectionHeading} ${classes.centered}`}>
                        <h1>
                            EVENTS
                        </h1>
                    </div>
                </section>
                <NavbarOld />
                <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle} order={true} boldIntro={"..."}
                                idx={3} description={[insertions[2], insertions[3]]} bg={colors[1].bg}
                                text={colors[1].text}/>
                <section className={`${classes.contentSection} ${classes.imageOverlay} ${classes.fullHeight}`} ref={menuContainerRef}
                         id={"menu"}>
                    <Menu/>
                </section>
                <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle} order={false} boldIntro={"..."}
                                idx={5} description={[insertions[4], insertions[5]]} bg={colors[2].bg}
                                text={colors[2].text}/>
                <section className={`${classes.contentSection}`} id={"locations"}>
                    <Locations/>
                </section>
                <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle} order={true} boldIntro={"..."}
                                idx={7} description={[insertions[6], insertions[7]]} bg={colors[3].bg}
                                text={colors[3].text}/>
                <section className={`${classes.contentSection}`} id={"contact"}>
                    <div className={`${classes.bgSectionHeading} ${classes.centered}`}>
                        <h1>
                            CONTACT
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