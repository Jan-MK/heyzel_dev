import React, { useEffect, useState } from 'react';
import classes from "./BlurryLoadingImage.module.scss"

const BlurryLoadingImage = ({
                                preview,
                                image,
                                alt,
                                imageStyleClass,
                                bgColor = 'transparent',
    objFit
                            }) => {
    const [currentImage, setCurrentImage] = useState(preview);
    const [loading, setLoading] = useState(true);

    const fetchImage = (src) => {
        const loadingImage = new Image();
        loadingImage.src = src;
        loadingImage.onload = () => {
            setCurrentImage(loadingImage.src);
            setLoading(false);
        };
    };

    const dynamicImageClass = `${imageStyleClass} ${loading ? classes.pulse : ''}`.trim();



    useEffect(() => {
        fetchImage(image);
    }, []);

    return (
            <img
                style={{
                    filter: `${loading ? 'blur(20px)' : ''}`,
                    transition: '1s filter linear',
                    width: '100%',
                    background: bgColor,
                    objectFit: objFit
                }}
                loading={"lazy"}
                src={currentImage}
                alt={alt}
                className={dynamicImageClass}
            />
    );
};

export default BlurryLoadingImage;