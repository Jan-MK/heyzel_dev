import classes from "./Locations.module.scss"
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

import cafe1 from "../../assets/media/HeroImages/cafe-1869656_1280.jpg"
import cafe2 from "../../assets/media/HeroImages/cafe-789635_1280.jpg"
import cafe3 from "../../assets/media/HeroImages/coffeehouse-2600877_1280.jpg"
import SingleLocation from "./SingleLocation/SingleLocation.jsx";
import {useWindowDimensions} from "../../context/WindowDimensionsContext.jsx";
import {useEffect} from "react";
import {maxWidthMobile, minWidthTablet} from "../../utility/Vars.jsx";


function Locations() {

    const {height, width, isSmartphone} = useWindowDimensions()

    useGSAP(() => {

        const locationWrappers = document.querySelectorAll(`.${classes.locationWrapper}`);
        const locationPhotos = document.querySelectorAll(`.${classes.locationsPhoto}`);
        let matchMedia = gsap.matchMedia()


        matchMedia.add(`(min-width: ${minWidthTablet}px)`, () => {
            // DESKTOP VERSION
            console.log("DESKTOP")
            locationWrappers.forEach((wrapper, index) => {
                if (index === locationWrappers.length - 1) return null;
                const photo = locationPhotos[index];
                photo.style.zIndex = locationPhotos.length - index;
                gsap.set(photo, {clipPath: "inset(0 0 0 0)"});

                const animation = gsap.to(photo, {
                    clipPath: "inset(0 0 100% 0)",
                    ease: "none",
                    paused: true,
                });

                ScrollTrigger.create({
                    trigger: wrapper,
                    start: () => "70% center",
                    end: () => "bottom 30%",
                    scrub: .5,
                    animation: animation,
                    markers: false,
                    invalidateOnRefresh: true
                });
            });
        })

        matchMedia.add(`(max-width: ${maxWidthMobile}px)`, () => {
            // MOBILE VERSION
            locationWrappers.forEach((wrapper, index) => {
                if (index === locationWrappers.length - 1) return null;
                const photo = locationPhotos[index];
                photo.style.zIndex = locationPhotos.length - index;
                gsap.set(photo, {clipPath: "inset(0 0 0 0)"});

                const animation = gsap.to(photo, {
                    clipPath: "inset(0 0 100% 0)",
                    ease: "none",
                    paused: true,
                });

                ScrollTrigger.create({
                    trigger: wrapper,
                    start: () => "70% center",
                    end: () => "bottom center",
                    scrub: .5,
                    animation: animation,
                    markers: false,
                    invalidateOnRefresh: true
                });
            });
        })
    })

    useEffect(() => {
        if (isSmartphone) {

            let textWrapper = document.getElementById('leftLocationsContainer')
            let lastLocation = document.getElementById('locHeadlineId')
            let photoWrapper = document.getElementById('rightLocationsContainer')
            let firstLocation = document.getElementById('firstLocation')
            let photoWrapperContent = document.getElementById('trueContentWrapper')
            photoWrapper.style.height = `${textWrapper.offsetHeight - lastLocation.offsetHeight}px`
            firstLocation.style.paddingTop = `${photoWrapperContent.offsetHeight}px`
        } else {
            let photoWrapper = document.getElementById('rightLocationsContainer')
            let firstLocation = document.getElementById('firstLocation')
            photoWrapper.style.height = ``
            firstLocation.style.paddingTop = ``
        }
    }, [height, width]);

    return (
        <div className={classes.locationsSection} id={'locationsContainer'}>
            <div className={`${classes.sectionHeading}`} id={'locationsTitle'}>
                <h1>
                    LOCATIONS
                </h1>
            </div>
            <div className={classes.description}>
                <p>
                    Dive into our menu featuring a variety of coffees, from classic espressos to rich lattes,
                    alongside
                    house-made ice teas and crafted cocktails. Plus, enjoy a selection of delectable snacks perfect
                    for any
                    time of day.
                </p>
            </div>
            <div className={classes.contentWrap}>
                <div className={classes.locations} id={'locationsWrapperContainer'}>
                    <div className={classes.locationsRightWrapper} id={'rightLocationsContainer'}>
                        <div className={classes.locationsRightContent} id={'trueContentWrapper'}>
                            <div className={classes.locationsPhotos}>
                                <div className={classes.shadow}>
                                    <div className={classes.locationsPhoto} title={1}>
                                        <img src={cafe1} alt={""}/>
                                    </div>
                                </div>
                                <div className={classes.shadow}>

                                    <div className={classes.locationsPhoto} title={2}>
                                        <img src={cafe2} alt={""}/>
                                    </div>
                                </div>

                                <div className={classes.shadow}>

                                    <div className={classes.locationsPhoto} title={3}>
                                        <img src={cafe3} alt={""}/>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={classes.locationsLeftWrapper}>
                        <div className={classes.locationsLeftContent} id={'leftLocationsContainer'}>
                            <div className={classes.locationWrapper} id={'firstLocation'}>

                                <SingleLocation
                                    title={'Königsplatz'}
                                    description={'You are on the go and need some snacks or coffee?'}
                                    address={{
                                        street: 'Konrad-Adenauer-Allee 7',
                                        zip: '86150',
                                        city: 'Augsburg',
                                    }}
                                    appleUrl={'https://maps.apple.com/?address=Konrad-Adenauer-Allee%207,%2086150%20Augsburg,%20Deutschland&auid=16570894358265817992&ll=48.365661,10.894951&lsp=9902&q=Heyzel%20Coffee'}
                                    googleUrl={'https://maps.app.goo.gl/oHHYBbkYjxZNFp447'}
                                    mail={'kp@heyzel.de'}
                                    phone={'+49 821 4504480'}
                                    openingHours={[
                                        {
                                            title: 'Monday - Thursday',
                                            description: '7 AM - 11 PM'
                                        },
                                        {
                                            title: 'Friday',
                                            description: '7 AM - 10 PM'
                                        },
                                        {
                                            title: 'Saturday',
                                            description: '12 PM - 10 PM'
                                        },
                                        {
                                            title: 'Sunday',
                                            description: 'closed'
                                        },
                                    ]}
                                />
                            </div>
                            <div className={classes.spacer}></div>
                            <div className={classes.locationWrapper}>

                                <SingleLocation
                                    title={'Rathausplatz'}
                                    description={'In a leisure atmosphere enjoy coffee in the morning or drinks at night.'}
                                    address={{
                                        street: 'Steingasse 3',
                                        zip: '86150',
                                        city: 'Augsburg',
                                    }}
                                    appleUrl={'https://maps.apple.com/?address=Steingasse%203%0A86150%20Augsburg%0ADeutschland&auid=6092646678093466525&ll=48.369263,10.897474&lsp=9902&q=Heyzel%20Coffee'}
                                    googleUrl={'https://maps.app.goo.gl/kRCkC4GS6cwheenG8'}
                                    mail={'rp@heyzel.de'}
                                    phone={'+49 821 4504480'}
                                    openingHours={[
                                        {
                                            title: 'Monday - Saturday',
                                            description: '9:30 AM - 1 AM'
                                        },
                                        {
                                            title: 'Sunday',
                                            description: '11 AM - 1 AM'
                                        },
                                    ]}
                                />
                            </div>
                            <div className={classes.spacer}></div>
                            <div className={classes.locationWrapper} id={'locHeadlineId'}>

                                <SingleLocation
                                    headlineId={'headlineId'}
                                    title={'Universität'}
                                    description={'Between courses or to exchange between your fellow students.'}
                                    address={{
                                        street: 'Idler Str. 24d',
                                        zip: '86159',
                                        city: 'Augsburg',
                                    }}
                                    appleUrl={'https://maps.apple.com/?address=Salomon-Idler-Stra%C3%9Fe%2024D,%2086159%20Augsburg,%20Deutschland&auid=3153212030896744291&ll=48.333709,10.899892&lsp=9902&q=Heyzel%20Coffee'}
                                    googleUrl={'https://maps.app.goo.gl/GSGcfWKiUCFqiLYT9'}
                                    mail={'uni@heyzel.de'}
                                    phone={'+49 821 4504480'}
                                    openingHours={[
                                        {
                                            title: 'Monday - Friday',
                                            description: '7:30 AM - 10 PM'
                                        },
                                        {
                                            title: 'Saturday',
                                            description: '11 AM - 18 PM'
                                        },
                                        {
                                            title: 'Sunday',
                                            description: 'closed'
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Locations;