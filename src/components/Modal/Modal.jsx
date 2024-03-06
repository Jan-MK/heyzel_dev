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
        let modalElement = document.getElementById("modal-root")
        if (!modalElement) return
        if (show) {
            gsap.set(modalElement, { opacity: 0 });
            setIsVisible(true); // Ensure component is visible for animation
            document.body.style.overflow = 'hidden';

            gsap.to(modalElement, {
                opacity: 1,
                duration: .25,
                ease: "none",
            });
        } else if (!show && isVisible) {
            document.body.style.overflow = 'unset';

            gsap.to(modalElement, {
                opacity: 0,
                duration: .25,
                ease: "none",
                onComplete: () => setIsVisible(false),
            });
        }
        return () => {
            // Kill GSAP animation to prevent it from finishing if the component unmounts
            gsap.killTweensOf(modalElement);

            // Restore body overflow only if closing the modal or unmounting
            if (isVisible) {
                document.body.style.overflow = 'unset';
            }
        };
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
