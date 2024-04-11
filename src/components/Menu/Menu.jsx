import classes from "./Menu.module.scss";
import menuArray from '../../assets/menu.json'
import {useEffect, useMemo, useRef} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useModal} from "../../context/ModalContext.jsx";
import {getDistinctRandomHex} from "../../utility/Utility.jsx";
import {useTranslation} from "react-i18next";
import coffeeTn from "../../assets/media/menu/coffee-tn.webp"
//import beansTn from "../../assets/media/menu/beans-tn.webp"
import foodTn from "../../assets/media/menu/food-tn.webp"
import drinksTn from "../../assets/media/menu/drinks-tn.webp"
import BlurryLoadingImage from "../Image/BlurryLoadingImage.jsx";


gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
    const {t} = useTranslation();
    let menuCats = menuArray.categories
    const itemListWrapperRef = useRef(null)
    const {openModal} = useModal()

    let coffee = "/assets/media/menu/coffee.webp"
    let food = "/assets/media/menu/food.webp"
    let drinks = "/assets/media/menu/drinks.webp"
    //let beans = "/assets/media/menu/beans.webp"

/*    useEffect(() => {
        toggleMount(1);
    }, []);*/

    function toggleMount(idx) {
        openModal(<div className={classes.singleCatWrapper}>
            {renderedImg[idx]}
            <div className={classes.rightWrapper}>
                {renderedName[idx]}
                <div className={classes.itemListWrapper} ref={itemListWrapperRef}>
                    {renderedContent[idx]}
                </div>
                {renderedAdditives[idx]}
            </div>
        </div>)
    }

    let colors = getDistinctRandomHex(4, '#FE0879')
    const renderedAdditives = useMemo(() => menuCats.map((cat) => (
        cat.additivesTitle && cat.additives &&
        <div key={cat.additivesTitle} className={classes.additives}>
            <p className={classes.addTitle}>{t(cat.additivesTitle)}:</p>
            {cat.additives.map((add, itemIdx) => (
                <p key={itemIdx}>{t(add)}</p>
            ))}
        </div>
    )), [menuCats, t]);

    const renderedImg = useMemo(() => menuCats.map((cat, idx) => (
        <div key={idx} className={classes.leftWrapper}>
            <BlurryLoadingImage lazy={false} preview={cat.images[1]} image={cat.images[0]} alt={t(cat.name)} imageStyleClass={classes.slideImage} />
        </div>
    )), [menuCats, t]);

    const renderedName = useMemo(() => menuCats.map((cat, idx) => (
        <div key={idx} className={classes.topWrapper}>
            <h2 className={classes.rightCatHeading}>{t(cat.name)}</h2>
            <p>{t(cat.description)}</p>
        </div>
    )), [menuCats, t]);

    const renderedContent = useMemo(() => menuCats.map((cat, idx) => (
        <ul key={idx} className={classes.itemList}>
            {cat.items.map((item) => (
                <li key={item.name} className={`${classes.listItem} ${item.headline ? classes.first : ''}`}>
                    <div className={`${classes.itemTopLine} ${item.headline ? classes.first : ''}`}>
                        <div className={classes.headingWrapper}>
                            <h3 className={classes.rightItemHeading}>{t(item.name)}</h3>
                        </div>
{/*                        <div className={classes.priceWrapper}>
                            {item.price1 ? <p className={classes.itemPrice}>{item.headline ? t(item.price1) : item.price1}</p> : <p>-</p>}
                            {item.price2 ? <p className={classes.itemPrice}>{item.headline ? t(item.price2) : item.price2}</p> : <p>-</p>}
                        </div>*/}
                    </div>
                    <div>
                        {item.description && <p className={classes.itemDescription}>{item.description.length > 1 && t(item.description)}</p>}
                    </div>
                </li>
            ))}
        </ul>
    )), [menuCats, t]);


    return (
        <>
            <div className={classes.menuSection}>
                <h1 className={classes.heading}>
                    {t('cardMenu.title')}
                </h1>
                <div className={classes.description}>
                    <p>
                        {t('cardMenu.dscr')}
                    </p>
                </div>
                <div className={classes.menuWrapper}>
                    {/* TODO<div className={classes.servicesWrapper}>
                        <div className={`${classes.div1} ${classes.gridItem} ${classes.verticalWrapper}`}
                             style={{backgroundColor: colors[0].bg, color: colors[0].text}}>
                            <div className={`${classes.text}`}>
                                <div className={classes.reverseOrder}>
                                    <h3>{t('cardMenu.day.title')}</h3>
                                    <p>{t('cardMenu.day.subtitle')}</p>
                                </div>
                                <p>{t('cardMenu.day.dscr')}</p>
                                <button className={"third"} onClick={() => toggleMount(1)}>{t('cardMenu.day.btn')}</button>
                            </div>
                            <div className={classes.photo}>
                                                                <BlurryLoadingImage alt={t('cardMenu.day.title')} image={coffee} preview={coffeeTn} />

                            </div>
                        </div>

                        <div className={`${classes.div4} ${classes.gridItem} ${classes.verticalWrapper}`}
                             style={{backgroundColor: colors[2].bg, color: colors[2].text}}>
                            <div className={`${classes.text}`}>
                                <div className={classes.reverseOrder}>
                                    <h3>{t('cardMenu.night.title')}</h3>
                                    <p>{t('cardMenu.night.subtitle')}</p>
                                </div>
                                <p>{t('cardMenu.night.dscr')}</p>
                                <button className={"third"} onClick={() => toggleMount(1)}>{t('cardMenu.night.btn')}</button>
                            </div>
                            <div className={classes.photo}>
<BlurryLoadingImage alt={t('cardMenu.night.title')} image={drinks} preview={drinksTn} />
                            </div>
                        </div>

                        <div className={`${classes.div2} ${classes.gridItem} ${classes.commonContent} ${classes.text}`}
                             style={{backgroundColor: colors[1].bg, color: colors[1].text}}>
                            <div className={classes.text}>
                                <h3>{t('cardMenu.food.title')}</h3>
                                <p>{t('cardMenu.food.dscr')}</p>
                                <button className={"third"} onClick={() => toggleMount(2)}>{t('cardMenu.food.btn')}</button>
                            </div>
                        </div>

                        <div className={`${classes.div3} ${classes.gridItem} ${classes.horizontal}`}
                             style={{backgroundColor: colors[3].bg, color: colors[3].text}}>
                            <div className={classes.photo}>
                                <BlurryLoadingImage alt={t('cardMenu.coffee.title')} image={coffee} preview={coffeeTn} />
                            </div>
                            <div className={classes.text}>
                                <h3>{t('cardMenu.coffee.title')}</h3>
                                <p>{t('cardMenu.coffee.dscr')}</p>
                                <button className={"third"}>{t('cardMenu.coffee.btn')}</button>
                            </div>
                        </div>

                    </div>*/}
                    <div className={classes.servicesWrapper}>
                        <div className={`${classes.div1} ${classes.gridItem} ${classes.verticalWrapper}`}
                             style={{backgroundColor: colors[0].bg, color: colors[0].text}}>
                            <div className={`${classes.text}`}>
                                <div className={classes.reverseOrder}>
                                    <h2>{t('cardMenu.day.title')}</h2>
                                    <p>{t('cardMenu.day.subtitle')}</p>
                                </div>
                                <p>{t('cardMenu.day.dscr')}</p>
                                <button className={"fourth"} style={{borderColor: colors[1].text}}
                                        onClick={() => toggleMount(0)}>{t('cardMenu.day.btn')}</button>
                            </div>
                            <div className={classes.photo}>
                                <BlurryLoadingImage alt={t('cardMenu.day.title')} image={coffee} preview={coffeeTn} />
                            </div>
                        </div>

                        <div className={`${classes.div4} ${classes.gridItem} ${classes.verticalWrapper}`}
                             style={{backgroundColor: colors[2].bg, color: colors[2].text}}>
                            <div className={`${classes.text}`}>
                                <div className={classes.reverseOrder}>
                                    <h2>{t('cardMenu.night.title')}</h2>
                                    <p>{t('cardMenu.night.subtitle')}</p>
                                </div>
                                <p>{t('cardMenu.night.dscr')}</p>
                                <button className={"fourth"} style={{borderColor: colors[2].text}}
                                        onClick={() => toggleMount(1)}>{t('cardMenu.night.btn')}</button>
                            </div>
                            <div className={classes.photo}>
                                <BlurryLoadingImage alt={t('cardMenu.night.title')} image={drinks} preview={drinksTn} />
                            </div>
                        </div>

                        <div className={`${classes.div2} ${classes.gridItem} ${classes.horizontal}`}
                             style={{backgroundColor: colors[3].bg, color: colors[3].text}}>
                            <div className={classes.photo}>
                                <BlurryLoadingImage alt={t('cardMenu.food.title')} image={food} preview={foodTn} />
                            </div>
                            <div className={classes.text}>
                                <h2>{t('cardMenu.food.title')}</h2>
                                <p>{t('cardMenu.food.dscr')}</p>
                                <button className={"fourth"} style={{borderColor: colors[3].text}}
                                        onClick={() => toggleMount(2)}>{t('cardMenu.food.btn')}</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
