import classes from "./Events.module.scss"
import PostCard from "./EventCard/PostCard";
import {useEffect, useMemo, useState} from "react";
import instagram from "/public/instagram_data.json"
import axios from 'axios';
import Masonry from "react-responsive-masonry";
import dj1 from "../../assets/media/events/dj-live-mixing-at-heyzel-tn.webp"
import dj2 from "../../assets/media/events/dj-electro-at-heyzel-tn.webp"
import dj3 from "../../assets/media/events/dj-live-electro-at-heyzel-tn.webp"
import live from "../../assets/media/events/live-music-at-heyzel-tn.webp"
import cheers from "../../assets/media/events/cheers-at-heyzel-tn.webp"
import BlurryLoadingImage from "../Image/BlurryLoadingImage.jsx";
import {Trans, useTranslation} from "react-i18next";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import {maxWidthMobile, minWidthTablet} from "../../utility/Vars.jsx";

gsap.registerPlugin(ScrollTrigger);


const wordFilter = [" "]
const postCount = 4;

function isValidPost(post) {
    if (!post || !post.caption) {
        return false;
    }

    const caption = post.caption.toLowerCase();
    return wordFilter.some(word => caption.includes(word.toLowerCase()));
}


function Events() {
    const {t} = useTranslation()

    /*    function instaDataFetch() {
            setInstaData(instagram?.data.filter(isValidPost).slice(0, postCount))
            axios.get('https://api.heyzel.de/getIGData.php', {
                timeout: 8000, // Adjusted timeout to a more realistic value
                headers: {
                    "Content-Type": "application/json",
                    // 'Access-Control-Allow-Origin': '*' is not needed here; this is a response header, not a request header
                }
            })
                .then(response => {
                    const data = response.data;
                    console.log(data)
                    setInstaData(data?.data.filter(isValidPost).slice(0, postCount).map((post) => (
                        <PostCard key={post.id} post={post}/>
                    )));
                })
                .catch(error => {
                    setError("Could not fetch the data.");
                    console.error('There has been a problem with your fetch operation:', error);
                });
        }*/

    useGSAP(() => {
        let imageContainer = document.getElementById('events')
        if (imageContainer) {
            let images = Array.from(imageContainer.getElementsByClassName(`${classes.eventImage}`));
            let gallery = images[0].parentElement
            let match = gsap.matchMedia()
            match.add(`(min-width: ${minWidthTablet}px)`, () => {
/*                gsap.from(images, {
                    opacity: 0,
                    stagger: 0.5,
                    scrollTrigger: {
                        trigger: images,
                        start: "center 80%",
                        end: "top 40%",
                        scrub: 1,
                    }
                })*/
            })
            match.add(`(max-width: ${maxWidthMobile}px)`, () => {
                gsap.from(images, {
                    opacity: 0,
                    stagger: 0.25,
                    scrollTrigger: {
                        trigger: gallery,
                        start: "center 75%",
                        end: "center center",
                        scrub: true,
                    }
                })
            })

        }
    })

    let images = [
        ["/assets/media/events/dj-live-mixing-at-heyzel.webp", dj1, "Enjoy live DJ's"],
        ["/assets/media/events/dj-electro-at-heyzel.webp", dj2, "Electro at Heyzel"],
        ["/assets/media/events/dj-live-electro-at-heyzel.webp", dj3, "Broad variety of music"],
        ["/assets/media/events/live-music-at-heyzel.webp", live, "Live music at Heyzel"],
        ["/assets/media/events/cheers-at-heyzel.webp", cheers, "Cheers to events at Heyzel"],
    ]

    const renderedImages = useMemo(() => images.map((item, idx) => (
        <BlurryLoadingImage key={idx} preview={item[1]} lazy={true} alt={item[2]} imageStyleClass={classes.eventImage}
                            image={item[0]} objFit={"cover"}/>
    )))

    /*
        useEffect(() => {
            instaDataFetch()
        }, []);*/

    return (
        <div className={classes.eventWrapper}>
            <h1>
                {t('menu.events')}
            </h1>
            <div className={classes.aboutEvents}>
                <p>{t('events.dscr1')}</p>
                <p><Trans i18nKey="events.dscr2">
                    part1 <span>hashtag</span>!
                </Trans></p>
            </div>
            <div className={classes.splitView}>
                <Masonry className={classes.eventImages} columnsCount={2} gutter={"10px"}>
                    {renderedImages}
                </Masonry>
                <div className={classes.right}>
                    <h2>{t('events.inside.heading1')}</h2>
                    <p>{t('events.inside.dscr1')}</p>
                    <h2>{t('events.inside.heading2')}</h2>
                    <p>{t('events.inside.dscr2')}</p>
                    <h2>{t('events.inside.heading3')}</h2>
                    <p>{t('events.inside.dscr3')}</p>
                    <br/>
                    <p><Trans i18nKey="events.inside.outro">
                        part1 <span>hashtag</span>!
                    </Trans></p>
                    <a href="https://www.instagram.com/heyzelcoffee/" target="_blank"
                       aria-label="Instagram" rel="noreferrer"
                       className={classes.instaLink}>{t('events.inside.btn')}</a>

                </div>
            </div>
            {/*            <div className={classes.featured}>
                <h2>Featured events</h2>
                <div className={classes.eventCarousel}>
                    {error ? <div>Error: {error}</div> : instaData.map((post) => <PostCard key={post.id} post={post}/>)}
                </div>
            </div>*/}
        </div>
    );
}

export default Events