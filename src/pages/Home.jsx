import classes from "./Home.module.scss"
import Navbar from "../components/Navigation/Navbar.jsx";
import Events from "../components/Events/Events.jsx";
import Menu from "../components/Menu/Menu.jsx";
import Hero from "../components/Hero/Hero.jsx";
import {useContext, useRef} from "react";
import NavbarContext from "../context/NavbarContext.jsx";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function Home(props) {


    const aboutRef = useRef(null)


    let content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aut dicta eligendi est, et excepturi fuga fugit illo ipsam maxime mollitia nam nihil non nulla obcaecati omnis, placeat quas quasi qui quisquam repellat sint suscipit. Alias asperiores deleniti eius eos esse explicabo fuga illo illum inventore modi nisi nobis nostrum pariatur provident, qui quos, rem repellat rerum. Aliquid at expedita nam nemo nesciunt. Alias animi at consequuntur doloremque, dolorum eaque enim excepturi explicabo facilis illo minus nobis officia pariatur praesentium quibusdam ratione repudiandae similique, sint temporibus tenetur. Adipisci alias aperiam asperiores aut corporis, culpa cum cumque, dolor dolores dolorum ea eaque earum et eum ex excepturi fugit harum id, iste itaque libero magni molestias natus nesciunt nihil odio officia officiis omnis perspiciatis quam quidem quos reiciendis repellendus sed sequi unde veniam! Illo non, odio. A aliquam asperiores aspernatur assumenda commodi cum debitis et explicabo magnam minus molestiae molestias neque nihil, numquam obcaecati odio optio, quam qui recusandae rem repellat sequi sunt tempore totam, velit! Accusamus aspernatur at beatae ipsa non numquam omnis quaerat, quo reprehenderit, tenetur veniam vitae. A adipisci amet at beatae, dolores eos est fugit illum laborum modi nesciunt odio porro possimus provident quas quidem similique sit veritatis. Cupiditate eveniet facere quas. Ab asperiores aut dignissimos dolorem eligendi fugiat harum hic illo magnam magni nesciunt perspiciatis, recusandae rem sapiente sed sit sunt. Ab ad, asperiores atque blanditiis consectetur doloremque doloribus eum explicabo fuga hic illo labore maxime, mollitia officiis quasi quisquam recusandae sit, sunt totam ullam velit vero!"
    return (
        <div>
            <Hero/>
            <Navbar notTop={true}/>
            <section className={`${classes.home}`} id={"home"}>

            </section>
            <section className={`${classes.home}`} id={"about"}>
                <div className={`container`}>
                    <h1 ref={aboutRef}>ABOUT</h1>
                    <p>{content}</p>
                </div>
            </section>
            <section className={`${classes.home}`} id={"events"}>
                <div className={`container`}>
                    <h1>EVENTS</h1>
                    <p>{content}</p>
                </div>
            </section>
            <section className={`${classes.home}`} id={"menu"}>
                <div className={`container`}>
                    <Menu/>
                </div>
            </section>
            <section className={`${classes.home}`} id={"locations"}>
                <div className={`container`}>
                    <h1>LOCATIONS</h1>
                    <p>{content}</p>
                </div>
            </section>
            <section className={`${classes.home}`} id={"contact"}>
                <div className={`container`}>
                    <h1>CONTACT</h1>
                    <p>{content}</p>
                </div>
            </section>
{/*            <section className={`${classes.home}`} id={"jobs"}>
                <Events/>
            </section>*/}
        </div>
    );
}

export default Home;