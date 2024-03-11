import React, {createContext, useContext, useState, useEffect} from 'react';

const WindowDimensionsContext = createContext({
    width: undefined,
    height: undefined,
    isSmartphone: false,
    isTablet: false,
    isDesktop: false,
});

function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    const isSmartphone = width <= 768;
    const isTablet = width > 768 && width <= 1070;
    const isDesktop = !isSmartphone && !isTablet;



    return {
        width,
        height,
        isSmartphone,
        isTablet,
        isDesktop,
    };
}

function debounce(fn, ms) {
    let timer;
    return _ => {
        clearTimeout(timer);
        timer = setTimeout(_ => {
            timer = null;
            fn.apply(this, arguments);
        }, ms);
    };
}


export function WindowDimensionsProvider({children}) {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        const debouncedHandleResize = debounce(() => {
            setWindowDimensions(getWindowDimensions());
        }, 250); // Adjust debounce time as needed

        window.addEventListener('resize', debouncedHandleResize);
        return () => window.removeEventListener('resize', debouncedHandleResize);
    }, []);


    return (
        <WindowDimensionsContext.Provider value={windowDimensions}>
            {children}
        </WindowDimensionsContext.Provider>
    );
}

export function useWindowDimensions() {
    return useContext(WindowDimensionsContext);
}