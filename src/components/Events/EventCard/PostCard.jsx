import React, { useState } from 'react';
import classes from './PostCard.module.scss';

function PostCard({ post }) {

    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    if (!post || !post.caption) {
        return <div className={classes.postCard}>
            <div className={classes.seeMore}>SEE MORE ON INSTAGRAM</div>

        </div>
    }
    const nextItem = () => {
        setCurrentItemIndex(prev =>
            prev + 1 === getAlbumItems().length ? 0 : prev + 1
        );
    };

    const previousItem = () => {
        setCurrentItemIndex(prev =>
            prev === 0 ? getAlbumItems().length - 1 : prev - 1
        );
    };

    const getAlbumItems = () => {
        return post.children && post.children.data ? post.children.data : [];
    };

    const renderAlbumItem = (item) => {
        switch (item.media_type) {
            case 'IMAGE':
                return <img src={item.media_url} alt="Album item" />;
            case 'VIDEO':
                return <video controls src={item.media_url} />;
            default:
                return null;
        }
    };

    const renderMedia = () => {
        switch (post.media_type) {
            case 'IMAGE':
                return <img src={post.media_url} alt="Post" />;
            case 'VIDEO':
                return <video controls src={post.media_url} />;
            case 'CAROUSEL_ALBUM':
                const albumItems = getAlbumItems();
                if (albumItems.length === 0) {
                    return <p>No items in the album</p>;
                }
                return (
                    <div className={classes.carousel}>
                        <button className={`${classes.arrow} ${classes.leftArrow}`} onClick={previousItem}>&lt;</button>
                        {renderAlbumItem(albumItems[currentItemIndex])}
                        <button className={`${classes.arrow} ${classes.rightArrow}`} onClick={nextItem}>&gt;</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={classes.postCard}>
            <div className={classes.postMedia}>
                {renderMedia()}
            </div>
            <div className={classes.postCaption}>
                <p>{post.caption}</p>
            </div>
        </div>
    );
}

export default PostCard;
