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

// Assuming PostCard component and wordFilter are defined elsewhere
function Events(props) {
    const [instaData, setInstaData] = useState([]);
    const [error, setError] = useState();

    function instaDataFetch() {
        console.log(instagram)
        setInstaData(instagram?.data.filter(isValidPost).slice(0, postCount))
        /*axios.get('http://api.heyzel.de/instagram_data.json', {
            method: 'post',
            timeout: 1000,
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*' // Could work and fix the previous problem, but not in all APIs

            },
            data: {
                property: "value",
            },})
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
            });*/
    }


    useEffect(() => {
        instaDataFetch()
    }, []);

    return (
        <div>
            {/* Your component structure */}
            <div className={classes.eventCarousel}>
                {error ? <div>Error: {error}</div> : instaData.map((post) => <PostCard key={post.id} post={post}/>)}
            </div>
        </div>
    );
}

export default Events