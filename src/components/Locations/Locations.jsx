import classes from "./Locations.module.scss"
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import koepiTn from "../../assets/media/locations/heyzel-koenigsplatz-tn.webp"
import rathiTn from "../../assets/media/locations/heyzel-rathausplatz-tn.webp"
import uniTn from "../../assets/media/locations/heyzel-universitaet-tn.webp"
import SingleLocation from "../SingleLocation/SingleLocation.jsx";
import {useWindowDimensions} from "../../context/WindowDimensionsContext.jsx";
import {useEffect} from "react";
import {maxWidthMobile, minWidthTablet} from "../../utility/Vars.jsx";
import {useTranslation} from "react-i18next";
import Image from "../Image/BlurryLoadingImage.jsx";
import BlurryLoadingImage from "../Image/BlurryLoadingImage.jsx";

gsap.registerPlugin(ScrollTrigger);

function Locations() {
    const { t, i18n } = useTranslation();
    const {height, width, isSmartphone} = useWindowDimensions()

    useGSAP(() => {

        const locationWrappers = document.querySelectorAll(`.${classes.locationWrapper}`);
        const locationPhotos = document.querySelectorAll(`.${classes.locationsPhoto}`);
        let matchMedia = gsap.matchMedia()


        matchMedia.add(`(min-width: ${minWidthTablet}px)`, () => {
            // DESKTOP VERSION
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

    let koepi = "/assets/media/locations/heyzel-koenigsplatz.webp"
    let rathi = "/assets/media/locations/heyzel-rathausplatz.webp"
    let uni = "/assets/media/locations/heyzel-universitaet.webp"

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
                    {t('locations.title')}
                </h1>
            </div>
            <div className={classes.description}>
                <p>
                    {t('locations.dscr')}
                </p>
            </div>
            <div className={classes.contentWrap}>
                <div className={classes.locations} id={'locationsWrapperContainer'}>
                    <div className={classes.locationsRightWrapper} id={'rightLocationsContainer'}>
                        <div className={classes.locationsRightContent} id={'trueContentWrapper'}>
                            <div className={classes.locationsPhotos}>
                                <div className={classes.shadow}>
                                    <div className={classes.locationsPhoto} title={1}>
                                        <BlurryLoadingImage image={koepi} preview={koepiTn} alt={"HEYZEL Königsplatz"}/>
                                        {/*<img loading="lazy" src={koepi} alt={"HEYZEL Königsplatz"}/>*/}
                                    </div>
                                </div>
                                <div className={classes.shadow}>

                                    <div className={classes.locationsPhoto} title={2}>
                                        <BlurryLoadingImage image={rathi} preview={rathiTn} alt={"HEYZEL Rathausplatz"}/>
                                        {/*<img loading="lazy" src={rathi} alt={"HEYZEL Rathausplatz"}/>*/}
                                    </div>
                                </div>

                                <div className={classes.shadow}>

                                    <div className={classes.locationsPhoto} title={3}>
                                        <BlurryLoadingImage image={uni} preview={uniTn} alt={"HEYZEL Universität"}/>

                                        {/*<img loading="lazy" src={uni} alt={"HEYZEL Universität"}/>*/}
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
                                    description={t('locations.loc1.dscr')}
                                    address={{
                                        street: 'Konrad-Adenauer-Allee 7',
                                        zip: '86150',
                                        city: 'Augsburg',
                                    }}
                                    appleUrl={'https://maps.apple.com/?address=Konrad-Adenauer-Allee%207,%2086150%20Augsburg,%20Deutschland&auid=16570894358265817992&ll=48.365661,10.894951&lsp=9902&q=Heyzel%20Coffee'}
                                    googleUrl={'https://maps.app.goo.gl/oHHYBbkYjxZNFp447'}
                                    openingHours={[
                                        {
                                            title: t('locations.loc1.openingHours.e1.title'),
                                            description: t('locations.loc1.openingHours.e1.dscr')
                                        },
                                        {
                                            title: t('locations.loc1.openingHours.e2.title'),
                                            description: t('locations.loc1.openingHours.e2.dscr')
                                        },
                                        {
                                            title: t('locations.loc1.openingHours.e3.title'),
                                            description: t('locations.loc1.openingHours.e3.dscr')
                                        },
                                        {
                                            title: t('locations.loc1.openingHours.e4.title'),
                                            description: t('locations.loc1.openingHours.e4.dscr')
                                        },
                                    ]}
                                />
                            </div>
                            <div className={classes.spacer}></div>
                            <div className={classes.locationWrapper}>

                                <SingleLocation
                                    title={'Rathausplatz'}
                                    description={t('locations.loc2.dscr')}
                                    address={{
                                        street: 'Steingasse 1-3',
                                        zip: '86150',
                                        city: 'Augsburg',
                                    }}
                                    appleUrl={'https://maps.apple.com/?address=Steingasse%203%0A86150%20Augsburg%0ADeutschland&auid=6092646678093466525&ll=48.369263,10.897474&lsp=9902&q=Heyzel%20Coffee'}
                                    googleUrl={'https://maps.app.goo.gl/kRCkC4GS6cwheenG8'}
                                    openingHours={[
                                        {
                                            title: t(`locations.loc2.openingHours.e1.title`),
                                            description: t('locations.loc2.openingHours.e1.dscr')
                                        },
                                        {
                                            title: t('locations.loc2.openingHours.e2.title'),
                                            description: t('locations.loc2.openingHours.e2.dscr')
                                        },
                                    ]}
                                />
                            </div>
                            <div className={classes.spacer}></div>
                            <div className={classes.locationWrapper} id={'locHeadlineId'}>

                                <SingleLocation
                                    headlineId={'headlineId'}
                                    title={'Universität'}
                                    description={t('locations.loc3.dscr')}
                                    address={{
                                        street: 'Salomon-Idler Str. 24d',
                                        zip: '86159',
                                        city: 'Augsburg',
                                    }}
                                    appleUrl={'https://maps.apple.com/?address=Salomon-Idler-Stra%C3%9Fe%2024D,%2086159%20Augsburg,%20Deutschland&auid=3153212030896744291&ll=48.333709,10.899892&lsp=9902&q=Heyzel%20Coffee'}
                                    googleUrl={'https://maps.app.goo.gl/GSGcfWKiUCFqiLYT9'}
                                    openingHours={[
                                        {
                                            title: t('locations.loc3.openingHours.e1.title'),
                                            description: t('locations.loc3.openingHours.e1.dscr')
                                        },
                                        {
                                            title: t('locations.loc3.openingHours.e2.title'),
                                            description: t('locations.loc3.openingHours.e2.dscr')
                                        },
                                        {
                                            title: t('locations.loc3.openingHours.e3.title'),
                                            description: t('locations.loc3.openingHours.e3.dscr')
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