import {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import Backdrop from "./Backdrop.jsx";
import classes from "./Modal.module.scss";
import {IoCloseSharp} from "react-icons/io5";
import {useLenis} from "@studio-freight/react-lenis";


function Modal({showModal, closeModal, content}) {
    let lenis = useLenis()
    const modalRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let modalElement = document.getElementById("modal-root")
        if (!modalElement) return
        if (showModal) {
            gsap.set(modalElement, {opacity: 0});
            setIsVisible(true); // Ensure component is visible for animation
            gsap.to(modalElement, {
                opacity: 1,
                duration: .25,
                ease: "none",
                onComplete: () => {
                    lenis.stop()
                    document.body.style.overflow = 'hidden'
                }
            });

        } else if (!showModal && isVisible) {
            document.body.style.overflow = 'unset';
            lenis.start()
            gsap.to(modalElement, {
                opacity: 0,
                duration: .25,
                ease: "none",
                onComplete: () => setIsVisible(false),
            });
        }
        return () => {
            gsap.killTweensOf(modalElement);

            if (isVisible) {
                lenis.start()
                document.body.style.overflow = 'unset';
            }
        };
    }, [showModal, isVisible]);


    return (
        isVisible && <Backdrop onClick={() => (closeModal ? closeModal() : {})}>
            <div
                className={classes.closeBtn}
                onClick={(e) => {
                    e.stopPropagation();
                    closeModal();
                }}
            >
                <IoCloseSharp/>
            </div>
            <div data-lenis-prevent className={classes.modal} ref={modalRef} onClick={(e) => e.stopPropagation()}>
                {content}
            </div>
        </Backdrop>
    );
}

export default Modal;
