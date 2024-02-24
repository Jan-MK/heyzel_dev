import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import classes from "./JobForm2nd.module.scss";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";

const steps = [
    <div className={classes.content}>STEP 0</div>,
    <div className={classes.content}>STEP 1</div>,
    <div className={classes.content}>STEP 2</div>,
    <div className={classes.content}>STEP 3</div>,
    <div className={classes.content}>STEP 4</div>,
    <div className={classes.content}>STEP 5</div>
];

function JobForm2nd(props) {
    const refArray = useRef([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [showIndicator, setShowIndicator] = useState(steps.map((el, idx) => true))
    const [sections, setSections] = useState(
        steps.map((step, idx) => {
            const stepsClass = `s${idx}`;
            let order = idx < currentStep ? classes.left : idx === currentStep ? classes.center : classes.right
            order = idx === currentStep ? classes.center : order

            return (
                <section key={idx} ref={(el) => (refArray.current[idx] = el)}
                         className={`${classes.step} ${classes[stepsClass]} ${order}`}>
                    {step}
                </section>
            );
        })
    );

    useEffect(() => {
        console.log(showIndicator)
    }, [showIndicator])

    const gotos = steps.map((el, idx) => <button key={idx} onClick={(e) => goTo(e, idx)}>{idx}</button>)

    function stepLeft() {
        if (currentStep > 0) {
            const previous = refArray.current[currentStep - 1]
            const current = refArray.current[currentStep]

            current.classList.remove(classes.center)
            current.classList.add(classes.right)
            previous.classList.remove(classes.left)
            previous.classList.add(classes.center)
            /*
                        gsap.set(previous, {
                            z: 50
                        })
                        gsap.to(current, {
                            xPercent: 100,
                            duration: duration,
                            ease: effect,
                            onComplete: () => {
                                gsap.set(current, {
                                    clearProps: "transform"
                                })
                                current.classList.remove(classes.center)
                                current.classList.add(classes.right)
                            }
                        })
                        gsap.to(previous, {
                            xPercent: 100,
                            duration: duration,
                            ease: effect,
                            onComplete: () => {
                                gsap.set(previous, {
                                    clearProps: "transform"
                                })
                                previous.classList.remove(classes.left)
                                previous.classList.add(classes.center)
                            }
                        })*/
            setCurrentStep(prev => prev - 1);
        }
    }


    function stepRight() {
        if (currentStep < sections.length - 1) {
            const next = refArray.current[currentStep + 1]
            const current = refArray.current[currentStep]

            current.classList.remove(classes.center)
            current.classList.add(classes.left)
            next.classList.remove(classes.right)
            next.classList.add(classes.center)
            /*
            gsap.set(next, {
                z: 50
            })
            gsap.to(current, {
                xPercent: -100,
                duration: duration,
                ease: effect,
                onComplete: () => {
                    gsap.set(current, {
                        clearProps: "transform"
                    })
                    current.classList.remove(classes.center)
                    current.classList.add(classes.left)
                }
            })
            gsap.to(next, {
                xPercent: -100,
                duration: duration,
                ease: effect,
                onComplete: () => {
                    gsap.set(next, {
                        clearProps: "transform"
                    })
                    next.classList.remove(classes.right)
                    next.classList.add(classes.center)
                }
            })*/
            setCurrentStep(prev => prev + 1);
        }
    }

    function goTo(event, index) {
        event.preventDefault()
        if (index === currentStep) return
        if (index < currentStep) {
            for (let i = currentStep; i > index; i--) {
                const prev = refArray.current[i].classList
                if(currentStep === i) prev.remove(classes.center)
                prev.remove(classes.left)
                prev.add(classes.right)
            }
            const newCurr = refArray.current[index].classList
            newCurr.remove(classes.left)
            newCurr.add(classes.center)
        } else {
            for (let i = currentStep; i < index; i++) {
                const next = refArray.current[i].classList
                if(currentStep === i) next.remove(classes.center)
                next.remove(classes.right)
                next.add(classes.left)
            }
            const newCurr = refArray.current[index].classList
            newCurr.remove(classes.right)
            newCurr.add(classes.center)
        }
        setCurrentStep(index)
    }


    function printShow() {
        console.log(refArray)
    }

    return (
        <div className={classes.cntcnt}>
            <div className={classes.cnt}>
                {sections.map((el, idx) => showIndicator[idx] && el)}
                <div className={classes.buttons}>
                    <button className={classes.ctrlBtn} onClick={stepLeft}>
                        <MdKeyboardArrowLeft/>
                    </button>
                    {gotos}
                    <button className={classes.ctrlBtn} onClick={printShow}>
                        Print showArray
                    </button>

                    <button className={classes.ctrlBtn} onClick={stepRight}>
                        <MdKeyboardArrowRight/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default JobForm2nd;

/*

function stepLeft() {
    if (currentStep > 0) {
        const previous = refArray.current[currentStep - 1]
        const current = refArray.current[currentStep]

        current.classList.remove(classes.center)
        current.classList.add(classes.right)
        previous.classList.remove(classes.left)
        previous.classList.add(classes.center)
        /!*
                    gsap.set(previous, {
                        z: 50
                    })
                    gsap.to(current, {
                        xPercent: 100,
                        duration: duration,
                        ease: effect,
                        onComplete: () => {
                            gsap.set(current, {
                                clearProps: "transform"
                            })
                            current.classList.remove(classes.center)
                            current.classList.add(classes.right)
                        }
                    })
                    gsap.to(previous, {
                        xPercent: 100,
                        duration: duration,
                        ease: effect,
                        onComplete: () => {
                            gsap.set(previous, {
                                clearProps: "transform"
                            })
                            previous.classList.remove(classes.left)
                            previous.classList.add(classes.center)
                        }
                    })*!/
        setCurrentStep(prev => prev - 1);
    }
}


function stepRight() {
    if (currentStep < sections.length - 1) {
        const next = refArray.current[currentStep + 1]
        const current = refArray.current[currentStep]

        current.classList.remove(classes.center)
        current.classList.add(classes.left)
        next.classList.remove(classes.right)
        next.classList.add(classes.center)
        /!*
        gsap.set(next, {
            z: 50
        })
        gsap.to(current, {
            xPercent: -100,
            duration: duration,
            ease: effect,
            onComplete: () => {
                gsap.set(current, {
                    clearProps: "transform"
                })
                current.classList.remove(classes.center)
                current.classList.add(classes.left)
            }
        })
        gsap.to(next, {
            xPercent: -100,
            duration: duration,
            ease: effect,
            onComplete: () => {
                gsap.set(next, {
                    clearProps: "transform"
                })
                next.classList.remove(classes.right)
                next.classList.add(classes.center)
            }
        })*!/
        setCurrentStep(prev => prev + 1);
    }
}

function goTo(event, index) {
    event.preventDefault()
    if (index === currentStep) return
    if (index < currentStep) {
        for (let i = currentStep; i > index; i--) {
            const prev = refArray.current[i].classList
            if(currentStep === i) prev.remove(classes.center)
            prev.remove(classes.left)
            prev.add(classes.right)
        }
        const newCurr = refArray.current[index].classList
        newCurr.remove(classes.left)
        newCurr.add(classes.center)
    } else {
        for (let i = currentStep; i < index; i++) {
            const next = refArray.current[i].classList
            if(currentStep === i) next.remove(classes.center)
            next.remove(classes.right)
            next.add(classes.left)
        }
        const newCurr = refArray.current[index].classList
        newCurr.remove(classes.right)
        newCurr.add(classes.center)
    }
    setCurrentStep(index)
}*/
