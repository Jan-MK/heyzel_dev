import { useEffect, useState } from 'react';
import classes from "./BlurryLoadingImage.module.scss"

// eslint-disable-next-line react/prop-types
const BlurryLoadingImage = ({preview, image, alt, imageStyleClass, bgColor = 'transparent', lazy = true, objFit}) => {
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
    }, [image]);

    return (
        /*
        <img src="default-image.jpg"
     srcset="image-450w.jpg 450w,
             image-810w.jpg 810w,
             image-1070w.jpg 1070w,
             image-1280w.jpg 1280w,
             image-1460w.jpg 1460w,
             image-1620w.jpg 1620w"
     sizes="(max-width: 600px) 450px,
            (max-width: 900px) 810px,
            (max-width: 1200px) 1070px,
            (max-width: 1400px) 1280px,
            (max-width: 1600px) 1460px,
            1620px"
     alt="Descriptive text about the image">
         */
            <img
                style={{
                    filter: `${loading ? 'blur(20px)' : ''}`,
                    transition: '1s filter linear',
                    width: '100%',
                    background: bgColor,
                    objectFit: objFit
                }}
                loading={lazy ? "lazy" : ""}
                src={currentImage}
                alt={alt}
                className={dynamicImageClass}
            />
    );
};

export default BlurryLoadingImage;