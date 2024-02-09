import classes from "./Menu.module.scss";
import menuArray from '../../assets/menu.json'
import {useEffect, useRef, useState} from "react";
import Modal from "../Modal/Modal.jsx";
import { IoChevronUpOutline, IoChevronDownOutline } from 'react-icons/io5';


export default function Menu() {
    let menuCats = menuArray.categories
    const [isMounted, setIsMounted] = useState(false);
    const [currentModalContent, setCurrentModalContent] = useState("")
    const [currentIdx, setCurrentIdx] = useState(-1)
    const [showUpArrow, setShowUpArrow] = useState(false);
    const [showDownArrow, setShowDownArrow] = useState(false);
    const itemListWrapperRef = useRef(null);


    useEffect(() => {
        // Function to call when the itemListWrapper is scrolled
        const handleScroll = () => {
            console.log('SCROLLED');
        };

        // Access the current element of the ref
        const element = itemListWrapperRef.current;

        // Check if the element is not null
        if (element) {
            // Add scroll event listener to the itemListWrapper
            element.addEventListener('scroll', handleScroll);
        }

        // Cleanup function to remove the event listener
        return () => {
            if (element) {
                element.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);


    function toggleMount(idx) {
        if (!isMounted) {

            setCurrentModalContent(rendered[idx])
            setCurrentIdx(idx)
            setIsMounted(true)
        }
        else {
            setIsMounted(false)
        }
    }


    const rendered = menuCats.map((cat, idx) => {
        return <div key={idx} className={classes.singleCatWrapper}>
            <div className={classes.leftWrapper}>
                {<img className={classes.slideImage} src={cat.images[0]} alt={cat.name}/>}
            </div>
            <div className={classes.rightWrapper}>
                <div><h2 className={classes.rightCatHeading}>{cat.name}</h2></div>
                {showUpArrow && <IoChevronUpOutline />}
                <div className={classes.itemListWrapper}  ref={itemListWrapperRef}>
                    <ul className={classes.itemList}>
                        {cat.items.map(item => {
                            return <li key={item.name} className={classes.listItem}>
                                <div className={classes.itemTopLine}>
                                    <h3 className={classes.rightItemHeading}>{item.name}</h3>
                                    <p className={classes.itemPrice}>{item.price}</p>
                                </div>
                                <div >
                                    <p className={classes.itemDescription}>{item.description}</p>
                                </div>
                            </li>
                        })}
                    </ul>

                </div>
                {showDownArrow && <IoChevronDownOutline />}
            </div>
        </div>
    })


    const categoriesThumbnail = menuCats.map((cat, idx) => {
        return (
            <div key={cat.name} className={classes.categoryWrapper} style={{
                backgroundImage: `url("${cat.images[0]}")`
            }}>
                <div className={classes.categoryContent}>
                    <div><h3 className={classes.heading}>{cat.name}</h3></div>
                    <div><button onClick={() => toggleMount(idx)}>show items</button>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <>
            <h2>Menu</h2>
            <div className={classes.allCategoryWrapper}>
                {categoriesThumbnail}
            </div>
            <Modal show={isMounted} toggleOpen={toggleMount}>
                {currentModalContent}
            </Modal>
        </>
    );
}