import {useState, useRef, useEffect} from 'react';
import {gsap} from 'gsap';
import classes from "./HorizontalMultiStep.module.scss";

function HorizontalMultiStep(props) {
    const [currentSection, setCurrentSection] = useState(0);
    const sectionWrapperRef = useRef(null);

    const sections = [
        {
            name: 'one',
            html: <section key="one" className={`${classes.scrollable} ${classes.one}`}></section>,
        },
        {
            name: 'two',
            html: <section key="two" className={`${classes.scrollable} ${classes.two}`}></section>,

        },
        {
            name: 'three',
            html: <section key="three" className={`${classes.scrollable} ${classes.three}`}></section>,

        },
        {
            name: 'four',
            html: <section key="four" className={`${classes.scrollable} ${classes.four}`}></section>,

        },
        {
            name: 'five',
            html: <section key="five" className={`${classes.scrollable} ${classes.five}`}></section>

        }
    ];
    const totalSections = sections.length; // Assuming you have 5 sections

    const navigationElements = sections.map((section, idx) => {
        const handleClick = () => {
            if (currentSection > idx) {
                setCurrentSection(idx);
            }
        };

        let className = classes.open;
        if (currentSection === idx) {
            className = classes.current;
        } else if (currentSection > idx) {
            className = classes.done;
        }

        return (
            <li
                className={className}
                key={idx}
                onClick={handleClick}
                style={{cursor: currentSection > idx ? 'pointer' : 'default'}}
            >
                {section.name}
            </li>
        );
    });

    useEffect(() => {
        document.body.style.overflowX = 'hidden'
    }, [])

    useEffect(() => {
        const viewportWidth = window.innerWidth;
        const distanceToTranslate = -currentSection * viewportWidth;

        gsap.to(sectionWrapperRef.current, {
            x: distanceToTranslate,
            duration: 1,
            ease: "power2.inOut",
        });
    }, [currentSection]);

    const handleNextClick = () => {
        if (currentSection < totalSections - 1) {
            setCurrentSection(currentSection + 1);
        }
    };

    const handleBackClick = () => {
        if (currentSection > 0) {
            setCurrentSection(currentSection - 1);
        }
    };

    return (
        <div className={classes.container}>
            <div ref={sectionWrapperRef} className={classes.sectionWrapper}>
                {sections.map((section) => {
                    return section.html
                })}
            </div>
            <div className={classes.controlBar}>
                <div>
                    <ul className={classes.navigationElements}>
                        {navigationElements}
                    </ul>
                </div>
                <button onClick={handleBackClick} className={`${classes.back} ${classes.ctrlBtn}`}>BACK</button>
                <button onClick={handleNextClick} className={`${classes.next} ${classes.ctrlBtn}`}>NEXT</button>
            </div>
        </div>
    );
}

export default HorizontalMultiStep;