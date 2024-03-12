import classes from "./Menu.module.scss";
import menuArray from '../../assets/menu.json'
import { useRef} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useModal} from "../../context/ModalContext.jsx";
import {getDistinctRandomHex} from "../../utility/Utility.jsx";
import {useTranslation} from "react-i18next";


gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
    const { t, i18n } = useTranslation();
    let menuCats = menuArray.categories
    const itemListWrapperRef = useRef(null)
    const {openModal} = useModal()

    function toggleMount(idx) {
        openModal(<div className={classes.singleCatWrapper}>
            {renderedImg[idx]}
            <div className={classes.rightWrapper}>
                {renderedName[idx]}
                <div className={classes.itemListWrapper} ref={itemListWrapperRef}>
                    {renderedContent[idx]}
                </div>
            </div>
        </div>)
    }

    let colors = getDistinctRandomHex(4, '#FE0879')

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

    return (
        <>
            <div className={classes.menuSection}>
                <h1 className={'sectionHeading'}>
                    {t('cardMenu.title')}
                </h1>
                <div className={classes.description}>
                    <p>
                        {t('cardMenu.dscr')}
                    </p>
                </div>
                <div className={classes.menuWrapper}>
                    <div className={classes.servicesWrapper}>
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
                                <img
                                    alt={t('cardMenu.day.title')}
                                    src={"https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800"}/>
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
                                <img alt={t('cardMenu.night.title')}
                                    src={"https://cdn.pixabay.com/photo/2023/04/26/16/20/cocktail-7952751_1280.jpg"}/>
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
                                <img src={"https://cdn.pixabay.com/photo/2015/09/01/21/00/coffee-beans-917613_1280.jpg"}
                                     alt={t('cardMenu.coffee.title')}/>
                            </div>
                            <div className={classes.text}>
                                <h3>{t('cardMenu.coffee.title')}</h3>
                                <p>{t('cardMenu.coffee.dscr')}</p>
                                <button className={"third"}>{t('cardMenu.coffee.btn')}</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
