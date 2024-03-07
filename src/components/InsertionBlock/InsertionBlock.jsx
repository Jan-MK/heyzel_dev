import classes from "./InsertionBlock.module.scss"
import {getRandomColor, maxWidthMobile, minWidthNonMobile} from "../../utility/Utility.jsx";
import React, {useRef} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function InsertionBlock({title, subtitle, description, idx, boldIntro, order, bg, text}) {
    const insertionRef = useRef(null)
    const subtitleRef = useRef(null)

    useGSAP(() => {
        const insertionDiv = insertionRef.current
        const subtitleHeading = subtitleRef.current

        let start = order ? -30 : 30;
        let end = order ? -80: 80;
        gsap.set(insertionDiv, {opacity: 0})


        gsap.to([insertionDiv], {
            opacity: 1,
            scrollTrigger: {
                trigger: insertionDiv,
                start: 'center bottom',
                end: "center center",
                markers: false,
                scrub: .5,
            }
        })

        let mm = gsap.matchMedia()
        mm.add(`(min-width: ${minWidthNonMobile}px)`, () => {
            gsap.set(subtitleHeading, {xPercent: start})
            gsap.to([subtitleHeading], {
                xPercent: end,
                scale: 1.5,
                scrollTrigger: {
                    trigger: insertionDiv,
                    start: 'center 90%',
                    end: "bottom top",
                    markers: false,
                    scrub: .5,
                }
            })
        })
        mm.add(`(max-width: ${maxWidthMobile}px)`, () => {
            gsap.set(subtitleHeading, {yPercent: -10})
            gsap.to([subtitleHeading], {
                yPercent: 80,
                scale: 1.5,
                scrollTrigger: {
                    trigger: insertionDiv,
                    start: 'center 90%',
                    end: "bottom top",
                    markers: false,
                    scrub: .5,
                }
            })
        })

    })

    const content = description.map((sentence, index) => (
        <React.Fragment key={index}>
            <span> {idx + index}. </span>
            {sentence}
        </React.Fragment>
    ));

    return (
        <div className={classes.insertionSection} style={{backgroundColor: `${bg}`, color: `${text}`}}
             ref={insertionRef}>
            <div className={`${classes.insertionBlockWrapper} container`}
                 style={{color: 'inherit', flexDirection: order ? 'row-reverse' : 'row'}}>
                <div className={classes.title} style={{color: 'inherit'}}>
                    <h2 style={{color: 'inherit'}}>{title}</h2>
                    <h4 style={{color: 'inherit'}} className={classes.subtitle} ref={subtitleRef}>{subtitle}</h4>
                </div>
                <div className={classes.description}>
                    <p style={{color: 'inherit'}}><span>{boldIntro} </span>{content}</p>
                </div>
            </div>
        </div>
    );
}

export default InsertionBlock;