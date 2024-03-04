import {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import Backdrop from "./Backdrop.jsx";
import classes from "./Modal.module.scss";
import {TfiClose} from "react-icons/tfi";

function Modal({show, toggleOpen, children}) {
    const modalRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Handle animations based on `show`
    useEffect(() => {
        // TODO AGAIN CHECK ANIMATION -> HARD TO SEE IF WORKING
        if (show) {
            gsap.set(modalRef.current, {opacity: 0})
            setIsVisible(true); // Ensure component is visible for animation
            gsap.to(modalRef.current, {
                opacity: 1,
                duration: .5,
                ease: "power3.inOut",
                onComplete: () => {
                    document.body.style.overflow = 'hidden'
                },
            });
        } else if (!show && isVisible) {
            console.log("Start fadeOut")
            document.body.style.overflow = 'unset'
            gsap.to(modalRef.current, {
                opacity: 0,
                duration: .5,
                ease: "power3.inOut",
                onComplete: () => {
                    setIsVisible(false)
                },
            });
        }
    }, [show, isVisible]);

    return (
            isVisible && <Backdrop reference={modalRef} onClick={() => (toggleOpen ? toggleOpen() : {})}>
                <div
                    className={classes.closeBtn}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleOpen();
                    }}
                >
                    <TfiClose/>
                </div>
                <div className={"modal"} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </Backdrop>
    );
}

export default Modal;
