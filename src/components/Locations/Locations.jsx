import classes from "./Locations.module.scss"
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import {useContext, useRef, useState} from "react";
import SingleLocation from "./SingleLocation/SingleLocation.jsx";
import NavbarContext from "../../context/NavbarContext.jsx";

gsap.registerPlugin(ScrollTrigger);

// eslint-disable-next-line no-unused-vars
function Locations(props) {
    const {navbarRef} = useContext(NavbarContext)
    const titleRef = useRef(null)
    const locationsRef = useRef(null)
    const locationImageRef = useRef(null)
    const lastHeadLineRef = useRef(null)
    // eslint-disable-next-line no-unused-vars
    const [testMobile, setTestMobile] = useState(<></>)


    useGSAP(() => {
        const title = titleRef.current
        const navbar = navbarRef.current
        const locationsContainer = locationsRef.current
        const locationsImage = locationImageRef.current

        const details = gsap.utils.toArray(`.${classes.desktopContentSection}:not(:first-child)`);
        const photos = gsap.utils.toArray(`.${classes.desktopPhoto}:not(:first-child)`);
        const allPhotos = gsap.utils.toArray(`.${classes.desktopPhoto}`);

        gsap.set(photos, {yPercent: 101});

        // Setup matchMedia
        let mm = gsap.matchMedia();

        mm.add("(min-width: 600px)", () => {
                console.log("desktop");

                if (title && navbar && locationsContainer) {
                    ScrollTrigger.create({
                        trigger: title,
                        start: `top top+=${navbar.offsetHeight}`,
                        endTrigger: locationsContainer,
                        end: 'bottom bottom',
                        pin: [title],
                        pinSpacing: false,
                        scrub: true,
                        markers: false,
                    })
                }

                ScrollTrigger.create({
                    trigger: locationsContainer,
                    start: "top top+=33px",
                    end: "bottom bottom",
                    pin: [locationsImage],
                    markers: false,
                });

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
                        scrub: true,
                        markers: false,
                    });
                });
            }
        )

        mm.add("(max-width: 599px)", () => {
                console.log("mobile");
                /*setTestMobile(<div>TESTMOBILE</div>)*/

                let lastHeadline = lastHeadLineRef.current

                ScrollTrigger.create({
                    trigger: locationsImage,
                    start: `top top+=${navbar.offsetHeight}px`,
                    endTrigger: lastHeadline,
                    end: `top top+=${locationsImage.offsetHeight + navbar.offsetHeight}px`,
                    pin: [locationsImage],
                    markers: true,
                });

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
                        scrub: true,
                        markers: false,
                    });
                });


            }
        )
    })


    return (
        <div>
            <h1 ref={titleRef} className={classes.sectionHeading}>Locations</h1>
            {testMobile}
            <div className={`${classes.gallery}`} ref={locationsRef}>
                <div className={`${classes.left}`}>
                    <div className={`${classes.desktopContent}`}>
                        <div className={`${classes.desktopContentSection}`}>
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
                                        day: 'Monday - Thursday',
                                        hours: '7 AM - 11 PM'
                                    },
                                    {
                                        day: 'Friday',
                                        hours: '7 AM - 10 PM'
                                    },
                                    {
                                        day: 'Saturday',
                                        hours: '12 PM - 10 PM'
                                    },
                                    {
                                        day: 'Sunday',
                                        hours: 'closed'
                                    },
                                ]}
                            />
                        </div>
                        <div className={`${classes.desktopContentSection}`}>
                            <SingleLocation
                                title={'Rathausplatz'}
                                description={'In a leisure atmosphere enjoy coffee in the morning or drinks\n' +
                                    '                            at night.'}
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
                                        day: 'Monday - Saturday',
                                        hours: '9:30 AM - 1 AM'
                                    },
                                    {
                                        day: 'Sunday',
                                        hours: '11 AM - 1 AM'
                                    },
                                ]}
                            />
                        </div>
                        <div className={`${classes.desktopContentSection}`}>
                            <SingleLocation
                                lastHeadLineRef={lastHeadLineRef}
                                title={'Universität'}
                                description={'Between courses or to exchange between your fellow students.'}
                                address={{
                                    street: 'Idler Str. 24d',
                                    zip: '86159',
                                    city: 'Augsburg',
                                }}
                                appleUrl={'https://maps.apple.com/?address=Salomon-Idler-Stra%C3%9Fe%2024D,%2086159%20Augsburg,%20Deutschland&auid=3153212030896744291&ll=48.333709,10.899892&lsp=9902&q=Heyzel%20Coffee'}
                                googleUrl={'https://maps.app.goo.gl/GSGcfWKiUCFqiLYT9'}
                                mail={'???@heyzel.de'}
                                phone={'+49 821 4504480'}
                                openingHours={[
                                    {
                                        day: 'Monday - Friday',
                                        hours: '7:30 AM - 10 PM'
                                    },
                                    {
                                        day: 'Saturday',
                                        hours: '11 AM - 18 PM'
                                    },
                                    {
                                        day: 'Sunday',
                                        hours: 'closed'
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                <div className={`${classes.right}`} ref={locationImageRef}>
                    <div className={`${classes.desktopPhotos}`}>
                        <div className={`${classes.desktopPhoto}`}><img
                            src={"https://images.pexels.com/photos/2193600/pexels-photo-2193600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                            alt={'Heyzel - Königsplatz'}/></div>
                        <div className={`${classes.desktopPhoto}`}><img
                            src={"https://images.pexels.com/photos/2551794/pexels-photo-2551794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                            alt={'Heyzel - Rathaus'}/></div>
                        <div className={`${classes.desktopPhoto}`}><img
                            src={"https://images.pexels.com/photos/1402407/pexels-photo-1402407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                            alt={'Heyzel - Universität'}/></div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Locations;