import {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import Backdrop from "./Backdrop.jsx";
import classes from "./Modal.module.scss";
import {TfiClose} from "react-icons/tfi";
import {useModal} from "../ModalContext.jsx";
import {IoChevronDownOutline, IoChevronUpOutline} from "react-icons/io5";

function Modal({showModal, closeModal, content}) {
    const modalRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Handle animations based on `show`
    useEffect(() => {
        let modalElement = document.getElementById("modal-root")
        if (!modalElement) return
        if (showModal) {
            gsap.set(modalElement, { opacity: 0 });
            setIsVisible(true); // Ensure component is visible for animation
            gsap.to(modalElement, {
                opacity: 1,
                duration: .25,
                ease: "none",
                onComplete: () => document.body.style.overflow = 'hidden'
            });

        } else if (!showModal && isVisible) {
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
    }, [showModal, isVisible]);


    return (
            isVisible && <Backdrop reference={modalRef} onClick={() => (closeModal ? closeModal() : {})}>
                <div
                    className={classes.closeBtn}
                    onClick={(e) => {
                        e.stopPropagation();
                        closeModal();
                    }}
                >
                    <TfiClose/>
                </div>
                <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
                    {content}
                </div>
            </Backdrop>
    );
}

export default Modal;
