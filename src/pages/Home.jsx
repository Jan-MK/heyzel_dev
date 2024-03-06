import classes from "./Home.module.scss"
import Navbar from "../components/Navigation/Navbar.jsx";
import Menu from "../components/Menu/Menu.jsx";
import Hero from "../components/Hero/Hero.jsx";
import {useContext, useRef} from "react";
import ReferenceContext from "../context/ReferenceContext.jsx";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Locations from "../components/Locations/Locations.jsx";
import Footer from "../components/Footer/Footer.jsx";
import InsertionBlock from "../components/InsertionBlock/InsertionBlock.jsx";
import Contact from "../components/Contact/Contact.jsx";
import {getDistinctRandomHex} from "../utility/Utility.jsx";

gsap.registerPlugin(ScrollTrigger);

function Home(props) {
    const aboutRef = useRef(null)
    const { menuContainerRef, locationsHeadingRef } = useContext(ReferenceContext)

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


    return (
        <>
            <Hero/>
            <Navbar notTop={true}/>
            <main className={`${classes.mainContent}`}>
                <section className={`${classes.contentSection}`} id={"about"} >
                    <div className={`${classes.bgSectionHeading} ${classes.centered}`}>
                        <h1 ref={aboutRef}>
                            ABOUT
                        </h1>
                    </div>
                </section>
                <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle} order={false}
                                boldIntro={insertionIntro} idx={1} description={[insertions[0], insertions[1]]} bg={colors[0].bg} text={colors[0].text}/>
                <section className={`${classes.contentSection}`} id={"events"}>
                    <div className={`${classes.bgSectionHeading} ${classes.centered}`}>
                        <h1>
                            EVENTS
                        </h1>
                    </div>
                </section>
                <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle} order={true} boldIntro={"..."}
                                idx={3} description={[insertions[2], insertions[3]]} bg={colors[1].bg} text={colors[1].text}/>
                <section className={`${classes.contentSection} ${classes.fullHeight}`} ref={menuContainerRef}
                         id={"menu"}>
                    <div className={`${classes.bgSectionHeading} ${classes.centered}`}>
                        <h1>
                            MENU
                        </h1>
                    </div>
                    <Menu />
                </section>
                <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle} order={false} boldIntro={"..."}
                                idx={5} description={[insertions[4], insertions[5]]} bg={colors[2].bg} text={colors[2].text}/>
                <section className={`${classes.contentSection}`} id={"locations"}>
                    <div className={`${classes.bgSectionHeading} ${classes.centered}`} ref={locationsHeadingRef}>
                        <h1>
                            LOCATIONS
                        </h1>
                    </div>
                    <Locations locationsHeadingRef={locationsHeadingRef}/>
                </section>
                <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle} order={false} boldIntro={"..."}
                                idx={7} description={[insertions[6], insertions[7]]} bg={colors[3].bg} text={colors[3].text}/>
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