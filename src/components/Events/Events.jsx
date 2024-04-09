import classes from "./Events.module.scss"
import PostCard from "./EventCard/PostCard";
import {useEffect, useState} from "react";
import instagram from "/public/instagram_data.json"
import axios from 'axios';

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
    const [instaData, setInstaData] = useState([]);
    const [error, setError] = useState();

    function instaDataFetch() {
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
    }



    useEffect(() => {
        instaDataFetch()
    }, []);

    return (
        <div>
            <div className={classes.aboutEvents}>
                <h2>The best parties start with <span>you</span>!</h2>

            </div>
            <div className={classes.featured}>
                <h2>Featured events</h2>
                <div className={classes.eventCarousel}>
                    {error ? <div>Error: {error}</div> : instaData.map((post) => <PostCard key={post.id} post={post}/>)}
                </div>
            </div>
        </div>
    );
}

export default Events