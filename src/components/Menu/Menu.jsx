import classes from "./Menu.module.scss";
import menuArray from '../../assets/menu.json'
import {useContext, useEffect, useRef, useState} from "react";
import Modal from "../Modal/Modal.jsx";
import {IoChevronUpOutline, IoChevronDownOutline} from 'react-icons/io5';
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import {minWidthNonMobile} from "../../utility/Utility.jsx";
import ReferenceContext from "../../context/ReferenceContext.jsx";
import {json} from "react-router-dom";
import useWindowDimensions from "../../utility/WindowSize.jsx";


gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
    let menuCats = menuArray.categories
    const {menuContainerRef} = useContext(ReferenceContext)
    const refArray = useRef([])
    const horizontalScrollRef = useRef(null)
    const [isMounted, setIsMounted] = useState(false);
    const [currentModalContent, setCurrentModalContent] = useState("");
    const [currentIdx, setCurrentIdx] = useState(-1);
    const itemListWrapperRef = useRef(null)
    const [showUpArrow, setShowUpArrow] = useState(false);
    const [showDownArrow, setShowDownArrow] = useState(false);
    const {height, width} = useWindowDimensions()

    // Handler for scroll events
    const handleScroll = () => {
        checkScrollability();
    };

    // TODO STILL NO ANIMATION WHEN DEPLOYED. CHECK!!!
    /*    useGSAP(() => {
            const refs = refArray.current
            let menuContainer = menuContainerRef.current
            /!*let horizontalScroll = horizontalScrollRef.current*!/
            let horizontalScroll = document.getElementById('horiScroll')


            console.log("menuContainer", menuContainer)
            console.log("horizontalScroll", horizontalScroll)
            if (menuContainer && horizontalScroll) {
    /!*            console.log("In if of useGsap of menu")
                let mm = gsap.matchMedia();
                mm.add(`(min-width: ${minWidthNonMobile}px)`, () => {
                    // Rendering for desktop
                    let distance = () => {
                        if (!refs.length) return 0; // Ensure the array is not empty
                        let lastItem = refs[refs.length - 1];
                        if (!lastItem) return 0; // Guard against undefined last item
                        let lastItemBounds = lastItem.getBoundingClientRect();
                        let containerBounds = horizontalScroll.getBoundingClientRect();
                        return Math.max(0, lastItemBounds.right - containerBounds.right);
                    };
                    gsap.to(horizontalScroll, {
                        x: () => -distance(),
                        ease: "none",
                        scrollTrigger: {
                            trigger: menuContainer,
                            start: "top top+=66px",
                            pinnedContainer: menuContainer,
                            end: () => "+=" + distance(),
                            pin: menuContainer,
                            scrub: true,
                            markers: false,
                            invalidateOnRefresh: true
                        }
                    })
                })*!/
                let mm = gsap.matchMedia();
                mm.add(`(min-width: ${minWidthNonMobile}px)`, () => {
                    // Rendering for desktop
                    let distance = horizontalScroll.offsetWidth
                    console.log(distance)
                    gsap.to(horizontalScroll, {
                        x: -distance,
                        ease: "none",
                        scrollTrigger: {
                            trigger: menuContainer,
                            start: "top top+=66px",
                            pinnedContainer: menuContainer,
                            end: `1000+=${distance}`,
                            pin: menuContainer,
                            scrub: true,
                            markers: true,
                            invalidateOnRefresh: true
                        }
                    })
                })
            }
        })*/

    useGSAP(() => {
        let topOfContainer = document.getElementById('menu')
        let wrapper = document.getElementById('racesWrapper')
        let races = document.getElementById('races')
        if (wrapper && races) {
            let racesWidth = races.offsetWidth
            let amountToScroll = racesWidth - wrapper.offsetWidth;

            console.log(races.offsetWidth, wrapper.offsetWidth)


            const tween = gsap.to(races,{
                x: -amountToScroll,
                ease: "none"
            })

            ScrollTrigger.create({
                trigger: topOfContainer,
                startTrigger: topOfContainer,
                start: "top top+=66px",
                end: "+=" + amountToScroll,
                pin: true,
                animation: tween,
                scrub: 1,
                markers: false,
            })

            ScrollTrigger.refresh()
        } else {
            console.log("wrapper ", wrapper, " or races ", races, " not found")
        }
    })

    useEffect(() => {
        checkScrollability()
    }, [currentModalContent]);

    const checkScrollability = () => {
        if (!itemListWrapperRef.current) return;

        const wrapper = itemListWrapperRef.current;
        const isScrollable = wrapper.scrollHeight > wrapper.clientHeight;
        const isScrolledToTop = wrapper.scrollTop === 0;
        const isScrolledToBottom = wrapper.scrollHeight - wrapper.scrollTop < wrapper.clientHeight + 5;

        setShowUpArrow(isScrollable && !isScrolledToTop);
        setShowDownArrow(isScrollable && !isScrolledToBottom);
    };

    function toggleMount(idx) {
        if (!isMounted) {
            setCurrentModalContent({
                image: renderedImg[idx],
                name: renderedName[idx],
                content: renderedContent[idx]
            });
            setCurrentIdx(idx);
            setIsMounted(true);
        } else {
            setIsMounted(false);
        }
    }

    const renderedImg = menuCats.map((cat, idx) => (
        <div key={idx} className={classes.leftWrapper}>
            <img className={classes.slideImage} src={cat.images[0]} alt={cat.name}/>
        </div>))

    const renderedName = menuCats.map((cat, idx) => (
        <div key={idx}><h2 className={classes.rightCatHeading}>{cat.name}</h2></div>
    ))

    const renderedContent = menuCats.map((cat, idx) => (
        <ul key={idx} className={classes.itemList}>
            {cat.items.map(item => (
                <li key={item.name} className={classes.listItem}>
                    <div className={classes.itemTopLine}>
                        <h3 className={classes.rightItemHeading}>{item.name}</h3>
                        <p className={classes.itemPrice}>{item.price}</p>
                    </div>
                    <div>
                        <p className={classes.itemDescription}>{item.description}</p>
                    </div>
                </li>
            ))}
        </ul>
    ));


    const categoriesThumbnail = menuCats.map((cat, idx) => (
        <div key={cat.name} ref={(el) => (refArray.current[idx] = el)} className={classes.categoryWrapper} style={{
            backgroundImage: `url("${cat.images[0]}")`
        }}>
            <div className={classes.overlay}></div>
            <div className={classes.categoryContent}>
                <div><h3 className={classes.heading}>{cat.name}</h3></div>
                <div className={classes.modalButton}>
                    <button className={'secondary'} onClick={() => toggleMount(idx)}>show</button>
                </div>
            </div>
        </div>
    ));
    // TODO IS IT COMPLETE?
    /*useEffect(() => {
        console.log("UP: ", showUpArrow, " DOWN: ", showDownArrow)
    }, [showUpArrow, showDownArrow]);*/

    useEffect(() => {
        console.log("menuContainer", menuContainerRef)
        console.log("horizontalScroll", horizontalScrollRef)
    }, [menuContainerRef, horizontalScrollRef]);

    return (
        <>
            <div className={classes.allCategoryWrapper} id={'racesWrapper'}>
                <div className={classes.insideWrapper} ref={horizontalScrollRef} id={'races'}>
                    {categoriesThumbnail}
                </div>
            </div>
            <Modal show={isMounted} toggleOpen={() => toggleMount(currentIdx)}>
                <div className={classes.singleCatWrapper}>
                    {currentModalContent.image}
                    <div className={classes.rightWrapper}>
                        {currentModalContent.name}
                        <div className={`${classes.scrollIndicator}`}>{showUpArrow && <IoChevronUpOutline/>}</div>
                        <div className={classes.itemListWrapper} onScroll={handleScroll} ref={itemListWrapperRef}>
                            {currentModalContent.content}
                        </div>
                        <div className={`${classes.scrollIndicator}`}>{showDownArrow && <IoChevronDownOutline/>}</div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
