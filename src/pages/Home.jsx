import classes from "./Home.module.scss"
import Navbar from "../components/Navigation/Navbar.jsx";
import Events from "../components/Events/Events.jsx";
import Menu from "../components/Menu/Menu.jsx";
import Hero from "../components/Hero/Hero.jsx";
import {useContext, useEffect, useRef, useState} from "react";
import NavbarContext from "../context/NavbarContext.jsx";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import Locations from "../components/Locations/Locations.jsx";
import Footer from "../components/Footer/Footer.jsx";
import InsertionBlock from "../components/InsertionBlock/InsertionBlock.jsx";
import Contact from "../components/Contact/Contact.jsx";

gsap.registerPlugin(ScrollTrigger);

function Home(props) {
    const [titleHeight, setTitleHeight] = useState(0)
    const aboutRef = useRef(null)
    const titleRef = useRef(null)
    const menuContainerRef = useRef(null)

    useEffect(() => {
        const titlePart = titleRef.current
        if (titlePart) {
            setTitleHeight(titlePart.offsetHeight)
        }
    }, [titleRef]);

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


    let content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aut dicta eligendi est, et excepturi fuga fugit illo ipsam maxime mollitia nam nihil non nulla obcaecati omnis, placeat quas quasi qui quisquam repellat sint suscipit. Alias asperiores deleniti eius eos esse explicabo fuga illo illum inventore modi nisi nobis nostrum pariatur provident, qui quos, rem repellat rerum. Aliquid at expedita nam nemo nesciunt. Alias animi at consequuntur doloremque, dolorum eaque enim excepturi explicabo facilis illo minus nobis officia pariatur praesentium quibusdam ratione repudiandae similique, sint temporibus tenetur. Adipisci alias aperiam asperiores aut corporis, culpa cum cumque, dolor dolores dolorum ea eaque earum et eum ex excepturi fugit harum id, iste itaque libero magni molestias natus nesciunt nihil odio officia officiis omnis perspiciatis quam quidem quos reiciendis repellendus sed sequi unde veniam! Illo non, odio. A aliquam asperiores aspernatur assumenda commodi cum debitis et explicabo magnam minus molestiae molestias neque nihil, numquam obcaecati odio optio, quam qui recusandae rem repellat sequi sunt tempore totam, velit! Accusamus aspernatur at beatae ipsa non numquam omnis quaerat, quo reprehenderit, tenetur veniam vitae. A adipisci amet at beatae, dolores eos est fugit illum laborum modi nesciunt odio porro possimus provident quas quidem similique sit veritatis. Cupiditate eveniet facere quas. Ab asperiores aut dignissimos dolorem eligendi fugiat harum hic illo magnam magni nesciunt perspiciatis, recusandae rem sapiente sed sit sunt. Ab ad, asperiores atque blanditiis consectetur doloremque doloribus eum explicabo fuga hic illo labore maxime, mollitia officiis quasi quisquam recusandae sit, sunt totam ullam velit vero!"
    return (
        <>
            <Hero/>
            <Navbar notTop={true}/>
            <div className={`${classes.scrollSnapContainer} ${classes.snapActive}`}>
                <section className={`${classes.snapSection}`} id={"about"}>
                    <h1 ref={aboutRef}>ABOUT</h1>
                </section>
                <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle} order={false} boldIntro={insertionIntro} description={[insertions[0], insertions[1]]} />
                <section className={`${classes.snapSection}`} id={"events"}>
                    <h1>EVENTS</h1>

                </section>
                <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle} order={true} boldIntro={"..."} description={[insertions[2], insertions[3]]} />
                <section className={`${classes.snapSection}`} ref={menuContainerRef} id={"menu"}>
                    <h1>MENU</h1>
                    <div className={classes.innerContainer}><Menu containerRef={menuContainerRef} /></div>
                </section>
                <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle} order={false} boldIntro={"..."} description={[insertions[4], insertions[5]]} />
                <section className={`${classes.test}`} id={"locations"}>
                    <Locations />
                </section>
                <InsertionBlock title={insertionTitle} subtitle={insertionSubTitle} order={false} boldIntro={"..."} description={[insertions[6], insertions[7]]} />
                <section className={`${classes.snapSection}`} id={"contact"}>
                    <h1>CONTACT</h1>
                    <Contact />
                </section>
            </div>
            <Footer />
        </>
    );
}

export default Home;