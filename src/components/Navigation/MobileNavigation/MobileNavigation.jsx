import classes from "./MobileNavigation.module.scss"
import {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {gsap} from 'gsap';
import {MdMenu} from "react-icons/md";
import {useGSAP} from "@gsap/react";
import "./menu.css"

/*const MobileNavigationMenu = ({ isOpen, onClose }) => {
    useEffect(() => {
        const tl = gsap.timeline();
        if (isOpen) {
            tl.fromTo("#monav-root",
                {
                    scaleX: 0,
                    scaleY: 0,
                    transformOrigin: "right top",
                },
                {
                    duration: 0.5,
                    scaleX: 1,
                    scaleY: 1,
                    ease: "power3.out",
                }
            );
        } else {
            tl.to("#monav-root", {
                duration: 0.5,
                scaleX: 0,
                scaleY: 0,
                transformOrigin: "right top",
                ease: "power3.in",
                onComplete: onClose,
            });
        }
    }, [isOpen, onClose]);

    return ReactDOM.createPortal(
        <div
            id="monav-root"
            className={classes.overlayMenu}
        >
            {/!* Navigation links or content *!/}
            <p>Home</p>
            <p>About</p>
            <p>Services</p>
            <p>Contact</p>
        </div>,
        document.getElementById('monav-root')
    );
};*/

const MobileNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuDivRef = useRef(null)
    const exitDivRef = useRef(null)

    useGSAP(() => {
        const menuBtn = menuDivRef.current
        const exitBtn = exitDivRef.current
        //const menuBtn = document.querySelector(".menu-div");
        //const exitBtn = document.querySelector(".exit");


        let newVar = menuBtn
        let newVar2 = exitBtn;
        console.log(newVar, newVar2)
        let t1
        if (menuBtn && exitBtn) {
            console.log("FOUND BOTH")
            t1 = gsap.timeline({paused: true});
            t1.to(".menu", {
                opacity: 1,
                duration: 1,
                top: 0,
                ease: "Power2.easeInOut"
            });
            t1.to(
                ".nav",
                {
                    opacity: 1,
                    marginBottom: 0,
                    duration: 1,
                    ease: "Power2.easeInOut",
                    stagger: 0.3,
                },
                ">-0.5"
            );



            exitBtn.addEventListener("click", () => {
                t1.timeScale(2.5);
                t1.reverse();
            });
        }
        menuBtn.addEventListener("click", () => {
            t1.play().timeScale(1);
        });
    })


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/*    <button onClick={toggleMenu} className={`${classes.mobile} transparent`}><MdMenu size={40}/>
            </button>*/}
            <div className="home">
                <div className="container"><a className="logo">Uniqo</a></div>
                <div className="container"><a className="menu-div" ref={menuDivRef}>Menu</a></div>
            </div>

            {isOpen && <div className={classes.menu}>
                <div className="background">Menu</div>
                <div className="exit" ref={exitDivRef}>CLOSE</div>
                <div className="menu-container">
                    <ul className="options">
                        <li className="nav"><a href="#" className="nav-link">Home <span
                            className="small-number">01</span></a></li>
                        <li className="nav"><a href="#" className="nav-link">Blog <span
                            className="small-number">02</span></a></li>
                        <li className="nav"><a href="#" className="nav-link">About <span
                            className="small-number">03</span></a></li>
                    </ul>
                </div>
                <div className="menu-container right">
                    <div className="information">
                        <p className="title">Where am I?</p>
                        <p className="description">123 my address</p>

                    </div>
                    <div className="information">
                        <p className="title">Contact</p>
                        <p className="description">andrewwoan@gmail.com</p>

                    </div>
                    <div className="information">
                        <p className="title">Follow me</p>
                        <div className="social-medias">
                            <a href="" className="social-media">twitter</a>
                            <a href="" className="social-media">youtube</a>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default MobileNavigation;
