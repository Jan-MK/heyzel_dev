import classes from "./Menu.module.scss";
import menuArray from '../../assets/menu.json'
import {useEffect, useRef, useState} from "react";
/*import Modal from "../Modal/Modal.jsx";
import {IoChevronUpOutline, IoChevronDownOutline} from 'react-icons/io5';*/
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useModal} from "../../context/ModalContext.jsx";


gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
    let menuCats = menuArray.categories
/*
    const refArray = useRef([])
*/
/*    const [isMounted, setIsMounted] = useState(false);
    const [currentModalContent, setCurrentModalContent] = useState("");
    const [currentIdx, setCurrentIdx] = useState(-1);
    const [showUpArrow, setShowUpArrow] = useState(false);
    const [showDownArrow, setShowDownArrow] = useState(false);*/
    const itemListWrapperRef = useRef(null)
    const {openModal} = useModal()
/*

    const handleScroll = () => {
        checkScrollability();
    };


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
*/

    function toggleMount(idx) {
/*        setCurrentIdx(idx);
        setCurrentModalContent({
            image: renderedImg[idx],
            name: renderedName[idx],
            content: renderedContent[idx]
        });*/
        openModal(<div className={classes.singleCatWrapper}>
            {renderedImg[idx]}
            <div className={classes.rightWrapper}>
                {renderedName[idx]}
{/*                <div className={`${classes.scrollIndicator}`}>{showUpArrow && <IoChevronUpOutline/>}</div>*/}
                <div className={classes.itemListWrapper} ref={itemListWrapperRef}>
                    {renderedContent[idx]}
                </div>
{/*                <div className={`${classes.scrollIndicator}`}>{showDownArrow && <IoChevronDownOutline/>}</div>*/}
            </div>
        </div>)
        /*        if (!isMounted) {
                    setIsMounted(true);
                } else {
                    setIsMounted(false);
                }*/
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


 /*   const categoriesThumbnail = menuCats.map((cat, idx) => (
        <div key={cat.name} ref={(el) => (refArray.current[idx] = el)} className={classes.categoryWrapper} style={{
            backgroundImage: `url("${cat.images[0]}")`
        }}>
            <div className={classes.overlay}></div>
            <div className={classes.categoryContent}>
                <div><h3 className={classes.heading}>{cat.name}</h3></div>
                <div className={classes.modalButton}>
                    <button className={'primary'} onClick={() => toggleMount(idx)}>show</button>
                </div>
            </div>
        </div>
    ));*/


    return (
        <>
            <div className={classes.menuSection}>
                <h1 className={'sectionHeading'}>
                    MENU
                </h1>

                <div className={classes.description}>
                    <p>
                        Dive into our menu featuring a variety of coffees, from classic espressos to rich lattes,
                        alongside
                        house-made ice teas and crafted cocktails. Plus, enjoy a selection of delectable snacks perfect
                        for any
                        time of day.
                    </p>
                </div>
                <div className={classes.menuWrapper}>
                    <div className={classes.servicesWrapper}>
                        <div className={`${classes.div1} ${classes.gridItem} ${classes.verticalWrapper}`}>
                            <div className={`${classes.text} ${classes.commonContent}`}>
                                <div className={classes.reverseOrder}>
                                    <h3>Tasty coffee.</h3>
                                    <p>During the day</p>
                                </div>
                                <p>From expertly brewed plain coffee to a variety of special blends, we got you.</p>
                                <button className={"secondary"} onClick={() => toggleMount(0)}>Day menu</button>
                            </div>
                            <div className={classes.photo}>
                                <img
                                    src={"https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800"}/>
                            </div>
                        </div>

                        <div className={`${classes.div2} ${classes.gridItem} ${classes.commonContent} ${classes.text}`}>
                            <h3>Food & Snacks</h3>
                            <p>A small variety of food and snacks to avoid you being hangry!</p>
                            <button className={"secondary"} onClick={() => toggleMount(2)}>Show me food</button>
                        </div>

                        <div className={`${classes.div3} ${classes.gridItem} ${classes.verticalWrapper}`}>
                            <div className={`${classes.text} ${classes.commonContent}`}>
                                <div className={classes.reverseOrder}>
                                    <h3>Amazing cocktails.</h3>
                                    <p>Afterwork</p>
                                </div>
                                <p>Transitioned to a bar at night we offer drinks and snacks while you're invited to
                                    enjoy the
                                    atmosphere.</p>
                                <button className={"secondary"} onClick={() => toggleMount(1)}>Bar menu</button>
                            </div>
                            <div className={classes.photo}>
                                <img
                                    src={"https://cdn.pixabay.com/photo/2023/04/26/16/20/cocktail-7952751_1280.jpg"}/>
                            </div>
                        </div>

                        <div
                            className={`${classes.div4} ${classes.gridItem} ${classes.commonContent} ${classes.horizontalWrapper}`}>
                            <div className={classes.photo}>
                                <img src={"https://cdn.pixabay.com/photo/2015/09/01/21/00/coffee-beans-917613_1280.jpg"}
                                     alt={"our selection"}/>
                            </div>
                            <div className={classes.text}>
                                <h3>We love coffee</h3>
                                <p>... and we're picky. Discover our coffee selection</p>
                                <button className={"secondary"}>Discover</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
