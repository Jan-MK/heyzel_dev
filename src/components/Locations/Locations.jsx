import classes from "./Locations.module.scss"
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import {useContext, useEffect, useRef, useState} from "react";
import SingleLocation from "./SingleLocation/SingleLocation.jsx";
import ReferenceContext from "../../context/ReferenceContext.jsx";
import {maxWidthMobile, minWidthNonMobile} from "../../utility/Utility.jsx";
import useWindowDimensions from "../../utility/WindowSize.jsx";

gsap.registerPlugin(ScrollTrigger);


function Locations() {
    const {height, width} = useWindowDimensions();
    const {navbarRef, locationsHeadingRef} = useContext(ReferenceContext)
    const locationsRef = useRef(null)
    const locationImageRef = useRef(null)
    const lastHeadLineRef = useRef(null)
    const [imageColumnHeight, setImageColumnHeight] = useState()

    useGSAP(() => {
        //const title = locationsHeadingRef.current
        const title = document.getElementById('locationsTitle')
        const navbar = document.getElementById('navBar')
        const locationsContainer = locationsRef.current
        const locationsImage = locationImageRef.current

        const details = gsap.utils.toArray(`.${classes.locationContentSection}:not(:first-child)`);
        const photos = gsap.utils.toArray(`.${classes.locationPhoto}:not(:first-child)`);
        const allPhotos = gsap.utils.toArray(`.${classes.locationPhoto}`);

        gsap.set(photos, {yPercent: 101});

        // Setup matchMedia
        let mm = gsap.matchMedia();

        mm.add(`(min-width: ${minWidthNonMobile}px)`, () => {
                console.log("desktop");
                if (title && navbar && locationsContainer) {
                    ScrollTrigger.create({
                        startTrigger: title,
                        //start: `top top+=${navbar.offsetHeight - 1}px`,
                        start: `top top+=65px`,
                        endTrigger: locationsContainer,
                        end: 'bottom bottom',
                        pin: [title],
                        pinSpacing: false,
                        scrub: true,
                        markers: false,
                        invalidateOnRefresh: true
                    })
                }

                if (title && locationsImage && locationsContainer) {
                    ScrollTrigger.create({
                        trigger: locationsContainer,
                        start: `top top+=${navbar.offsetHeight + title.offsetHeight}px`,
                        end: "bottom bottom",
                        pin: locationsImage,
                        markers: false,
                        invalidateOnRefresh: true
                    });
                }

                // Create scroll trigger for each details section
                details.forEach((detail, index) => {
                    let headline = detail.querySelector('h1');
                    let animation = gsap.timeline()
                        .to(photos[index], {yPercent: 0})
                        .set(allPhotos[index], {autoAlpha: 0});

                    ScrollTrigger.create({
                        trigger: headline,
                        start: "top 80%",
                        end: "top 50%",
                        animation: animation,
                        scrub: 1,
                        markers: false,
                        invalidateOnRefresh: true
                    });
                });
            }
        )

        mm.add(`(max-width: ${maxWidthMobile}px)`, () => {
                console.log("mobile");

            let headlineId = document.getElementById('headlineId')

                ScrollTrigger.create({
                    trigger: locationsImage,
                    start: `top top+=${navbar.offsetHeight}px`,
                    endTrigger: headlineId,
                    end: `top top+=${locationsImage.offsetHeight + navbar.offsetHeight}px`,
                    pin: [locationsImage],
                    markers: true,
                    invalidateOnRefresh: true
                });

                // Create scroll trigger for each details section
                details.forEach((detail, index) => {
                    let headline = detail.querySelector('h1');
                    let animation = gsap.timeline()
                        .to(photos[index], {yPercent: 0})
                        .set(allPhotos[index], {autoAlpha: 0});
                    // TODO Hakelig -> smooth scroll
                    ScrollTrigger.create({
                        trigger: headline,
                        start: "top 80%",
                        end: "top 50%",
                        animation: animation,
                        scrub: true,
                        markers: false,
                        invalidateOnRefresh: true
                    });
                });


            }
        )
    })


    return (
        <div className={classes.locationsSection}>
            <div className={`${classes.sectionHeading}`} id={'locationsTitle'} ref={locationsHeadingRef}>
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
            <div className={`${classes.gallery}`} ref={locationsRef}>
                <div className={`${classes.left}`}>
                    <div className={`${classes.locationContentWrapper}`}>
                        <div className={`${classes.locationContentSection}`}>
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
                        <div className={`${classes.locationContentSection}`}>
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
                        <div className={`${classes.locationContentSection}`}>
                            <SingleLocation
                                lastHeadLineRef={lastHeadLineRef}
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

                <div className={`${classes.right}`} ref={locationImageRef}>
                    <div className={`${classes.locationPhotos}`}>
                        <div className={`${classes.locationPhoto}`}><img
                            src={"https://images.pexels.com/photos/2193600/pexels-photo-2193600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                            alt={'Heyzel - Königsplatz'}/></div>
                        <div className={`${classes.locationPhoto}`}><img
                            src={"https://images.pexels.com/photos/2551794/pexels-photo-2551794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                            alt={'Heyzel - Rathaus'}/></div>
                        <div className={`${classes.locationPhoto}`}><img
                            src={"https://images.pexels.com/photos/1402407/pexels-photo-1402407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                            alt={'Heyzel - Universität'}/></div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Locations;